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
  const plans = {
    'monthly-access':{name:'Study membership',price:14.99,interval:'month'},
    'semester-access':{name:'Semester Access',price:44.99,access_days:120},
    'lifetime-access':{name:'Lifetime Access',price:149},
    'ai-monthly-access':{name:'AI-Powered Monthly',price:24.99,interval:'month'}
  };
  context._changePlanData={plans};
  for (const id of Object.keys(plans)) {
    const output={innerHTML:'',style:{},querySelectorAll:()=>[]};
    context.renderPlanTier(id.startsWith('ai-'),{plan_id:id},output,{style:{}});
    const offers=[...output.innerHTML.matchAll(/data-plan-id="([^"]+)"/g)].map(m=>m[1]);
    assert.deepEqual(offers,[id]);
  }
  assert(!readFileSync('settings.html','utf8').includes('id="membership-change-plan-btn"'));
  assert(!readFileSync('settings.html','utf8').includes('href="rounds.html"'));
  console.log('Portal return, safe redirect, retry state, matrix labels and retired-plan protections passed');
})();
