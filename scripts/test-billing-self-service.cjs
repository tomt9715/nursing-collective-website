const {readFileSync} = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
(async () => {
  const button = {disabled:false};
  const status = {textContent:''};
  let request, destination;
  const context = vm.createContext({
    requireAuth: () => Promise.resolve(true), URL, console,
    document: {querySelectorAll:()=>[], addEventListener(){}, getElementById:id => id === 'billing-manage-btn' ? button : id === 'billing-manage-status' ? status : null},
    window:{location:{origin:'https://preview.example',hash:'',assign:url => {destination=url;}}},
    apiCall:async (...args) => {request=args; return {url:'https://billing.stripe.com/p/session'};}
  });
  vm.runInContext(readFileSync('settings-script.js','utf8'),context);
  await context.openBillingPortal();
  assert.equal(request[0],'/api/subscription/manage');
  assert.equal(JSON.parse(request[1].body).return_url,'https://preview.example/settings#billing');
  assert.equal(destination,'https://billing.stripe.com/p/session');
  context.apiCall=async()=>({url:'https://unexpected.example/'});
  destination=null;
  await context.openBillingPortal();
  assert.equal(destination,null);
  assert.equal(button.disabled,false);
  assert.match(status.textContent,/try again/);
  const {JSDOM}=require('jsdom');
  const quiz=vm.createContext({document:new JSDOM('').window.document});
  vm.runInContext(readFileSync('guides/quiz/quiz-engine.js','utf8')+';this.Engine=QuizEngine;',quiz);
  const engine=Object.create(quiz.Engine.prototype);
  const html=engine._renderMatrixOptions({id:'sample',matrixColumns:['Expected','Report'],options:[{id:'a',text:'Finding "A"'}]});
  assert.match(html,/aria-label="Finding &quot;A&quot;: Expected"/);
  assert.match(html,/aria-label="Finding &quot;A&quot;: Report"/);
  console.log('Portal return, safe redirect, retry state, and matrix labels passed');
})();
