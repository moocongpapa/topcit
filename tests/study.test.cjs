// Run with: node --test tests/study.test.cjs
// These tests exercise the actual inline application with a small DOM adapter.
// They cover data integrity and state transitions; visual checks need a browser.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const main = [...html.matchAll(/<script(?: [^>]*)?>([\s\S]*?)<\/script>/g)].at(-1)[1];
const data = fs.readFileSync(path.join(root, 'study-data.js'), 'utf8');

function app(saved = {}) {
  const storage = new Map(Object.entries(saved));
  const nodes = new Map();
  function node(selector) {
    if (!nodes.has(selector)) {
      const classes = new Set();
      nodes.set(selector, {
        innerHTML: '', textContent: '', value: '', listeners: {},
        classList: {
          add: c => classes.add(c), remove: c => classes.delete(c),
          contains: c => classes.has(c),
          toggle(c, force = !classes.has(c)) {
            if (force) classes.add(c); else classes.delete(c);
            return force;
          },
        },
        addEventListener(type, handler) {
          (this.listeners[type] ??= []).push(handler);
        },
        querySelectorAll: () => [],
        setAttribute() {}, scrollIntoView() {}, focus() {},
      });
    }
    return nodes.get(selector);
  }
  const context = vm.createContext({
    window: {},
    document: {
      querySelector: node, querySelectorAll: () => [],
      getElementById: id => node('#' + id),
      documentElement: node('html'), addEventListener() {},
    },
    localStorage: {
      getItem: key => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
    },
    setInterval: () => 1, clearInterval() {},
  });
  vm.runInContext(data, context);
  vm.runInContext(main, context);
  return {
    run: code => vm.runInContext(code, context),
    json: code => JSON.parse(vm.runInContext(`JSON.stringify(${code})`, context)),
    view: () => node('#view').innerHTML,
    storage,
  };
}

test('all questions and lessons have valid references and stable existing IDs', () => {
  const a = app();
  const { quizzes, textbook, reviewCards, studyResources } = a.json('({quizzes,textbook,reviewCards,studyResources})');
  assert.equal(quizzes.length, 230);
  assert.equal(new Set(quizzes.map(q => q.question)).size, 230);
  assert.equal(textbook.length, 34);
  assert.equal(reviewCards.length, 102);
  assert.equal(new Set(reviewCards.map(r => r.id)).size, reviewCards.length);
  assert.equal(reviewCards[66].id, 'book-trace-lab-0');
  const chapters = new Map(textbook.map(c => [c.id, c]));
  quizzes.forEach((q, i) => {
    assert.equal(q.id, i);
    assert.ok(q.question && q.answer && Array.isArray(q.keys));
    if (q.type === '객관식') {
      assert.equal(q.options.length, 4);
      assert.ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct < 4);
    }
    if (q.origin) {
      assert.equal(chapters.get(q.chapterId)?.module, q.module);
      assert.ok(q.day >= 1 && q.day <= 5);
      if (q.type !== '객관식') assert.ok(q.rubric.length >= 3);
    }
  });
  assert.equal(studyResources.length, 27);
  assert.equal(studyResources.filter(r => r.kind === '공개 기출').length, 13);
  for (const r of studyResources) assert.equal(new URL(r.url).protocol, 'https:');
  const days = a.json('window.TOPCIT_STUDY.days');
  assert.equal(days.length, 7);
  for (const d of days) for (const slug of d.chapters) assert.ok(chapters.has('book-' + slug));
});

test('random mock exams always have 75 unique questions with the required mix', () => {
  const a = app();
  for (let n = 0; n < 30; n++) {
    a.run('startMock(true, true)');
    const questions = a.json('studyState.mock.ids.map(id => quizzes[id])');
    assert.equal(new Set(questions.map(q => q.id)).size, 75);
    const count = predicate => questions.filter(predicate).length;
    for (const [module, total] of Object.entries({m1:21,m2:19,m3:18,m4:17})) {
      assert.equal(count(q => q.module === module), total);
    }
    for (const [type, total] of Object.entries({'객관식':60,'서술형':7,'수행형':8})) {
      assert.equal(count(q => q.type === type), total);
    }
    assert.ok(a.run('studyState.mock.deadline - Date.now()') > 149 * 60000);
    assert.ok(!a.view().includes('class="secondary reveal"'));
  }
});

test('resuming preserves the deadline and answers; replacing needs explicit confirmation', () => {
  const a = app();
  a.run('studyState.answers[110]="2"; startMock(); studyState.mock.answers[studyState.mock.ids[0]]="1"; saveStudy()');
  const initial = a.json('studyState.mock');
  a.run('startMock()');
  assert.deepEqual(a.json('studyState.mock'), initial);
  a.run('startMock(true)');
  assert.deepEqual(a.json('studyState.mock'), initial);
  assert.match(a.view(), /새 세트로 교체/);
  a.run('startMock(true,true)');
  assert.deepEqual(a.json('studyState.mock.answers'), {});
  assert.equal(a.run('studyState.answers[110]'), '2');
  const restored = app(Object.fromEntries(a.storage));
  assert.deepEqual(restored.json('studyState.mock'), a.json('studyState.mock'));
});

test('submitting locks answers and scores MC answers independently of review marks', () => {
  const a = app();
  a.run(`startMock();
    for (const id of studyState.mock.ids) {
      if (quizzes[id].type === '객관식') studyState.mock.answers[id] = String(quizzes[id].correct);
    }
    finishMock(); renderQuiz();`);
  assert.match(a.view(), /객관식 60\/60 정답/);
  assert.match(a.view(), /<fieldset disabled>/);
  assert.equal(a.run('Object.values(studyState.mock.marks).filter(m=>m==="review").length'), 15);
  a.run('for (const id of studyState.mock.ids) studyState.mock.marks[id]="wrong"; renderQuiz()');
  assert.match(a.view(), /객관식 60\/60 정답/);
});

test('an expired mock finishes when reopened, including a reload', () => {
  const a = app();
  a.run('startMock(); studyState.mock.deadline=Date.now()-1000; saveStudy()');
  const restored = app(Object.fromEntries(a.storage));
  restored.run('startMock()');
  assert.equal(restored.run('studyState.mock.finished'), true);
  assert.match(restored.view(), /제출 완료 · 객관식 0\/60 정답/);
});

test('corrupt persisted data is recovered and duplicate mock IDs are rejected', () => {
  for (const raw of ['{invalid', 'null', '[]', '{"answers":[],"notes":42}']) {
    const a = app({'topcit-practice-v1': raw});
    assert.deepEqual(a.json('studyState.answers'), {});
    assert.deepEqual(a.json('studyState.notes'), {});
    assert.equal(a.run('studyState.mock'), null);
  }
  const a = app({'topcit-practice-v1': JSON.stringify({mock:{ids:Array(75).fill(1),deadline:Date.now()+1000}})});
  assert.equal(a.run('studyState.mock'), null);
});

test('practice notes and long answers are escaped before rendering', () => {
  const a = app();
  a.run('studyState.notes[110]="<img src=x onerror=alert(1)>"; openDayQuiz(1)');
  assert.match(a.view(), /&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.ok(!a.view().includes('<img src=x'));
});
