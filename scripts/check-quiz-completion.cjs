const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
let recorded = 0, rendered = 0, masteryCalls = 0;
const ctx = { console: { warn() {} }, window: { removeEventListener() {} },
    QuizHistory: { recordSession() { recorded++; } },
    MasteryTracker: { recordSetResult() { masteryCalls++; throw Error('Optional tracker unavailable'); } }
};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('guides/quiz/quiz-engine.js', 'utf8') + '\nthis.Engine = QuizEngine;', ctx);
const quiz = Object.create(ctx.Engine.prototype);
Object.assign(quiz, { phase: 'quiz', mode: 'exam', isReviewMode: false, isAIGenerated: false,
    sessionStartTime: Date.now(), guideSlug: 'heart-failure', results: new Map([['q1', { correct: true }]]),
    activeQuestions: [{ id: 'q1' }], _stopTimer() {}, _clearSavedState() {},
    _renderResultsScreen() { rendered++; }
});
quiz.showResults();
quiz.showResults();
assert.equal(recorded, 1);
assert.equal(masteryCalls, 1);
assert.equal(rendered, 2);
for (const name of fs.readdirSync('guides/quiz').filter(name => name.endsWith('.html'))) {
    const html = fs.readFileSync('guides/quiz/' + name, 'utf8');
    if (html.includes('../../app/mastery.js')) {
        assert(html.indexOf('../../app/data/registry.js') >= 0, name);
        assert(html.indexOf('../../app/data/registry.js') < html.indexOf('../../app/mastery.js'), name);
    }
}
console.log('PASS: exam results survive optional tracker failure, attempts record once, and quiz pages load the mastery registry first.');
