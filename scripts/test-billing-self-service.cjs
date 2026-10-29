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
  const question={id:'access-test',type:'single',stem:'Sample question',correct:'a',options:[{id:'a',text:'Answer'}],rationale:{correct:'Built-in rationale'},guideSectionId:'sample'};
  engine.guideSlug='sample'; engine.results=new Map([[question.id,{correct:true,userAnswer:'a',correctAnswer:'a'}]]);
  engine.flaggedQuestions=new Set(); engine.questionTimes=new Map(); engine._shuffledOptions=new Map();
  for (const allowed of [false,true]) {
    engine.canExplainQuestions=allowed;
    const feedback=engine._buildPracticeFeedback(question,'a',true,false);
    const result=engine._renderResultItem(question,0);
    assert.equal(feedback.includes('data-quiz-action="explain-question"'),allowed);
    assert.equal(result.includes('data-quiz-action="explain-question"'),allowed);
    assert(feedback.includes('Built-in rationale'));
    assert(result.includes('Built-in rationale'));
  }
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
  assert(!readFileSync('guides/guide-script.js','utf8').includes("aiScript.src = 'ai-section-quiz.js'"));
  const billingList={innerHTML:'',classList:{remove(){}}};
  context.document.getElementById=id => id === 'billing-list' ? billingList : null;
  context.renderBillingHistory({invoices:[{created:1,amount:14.99,status:'failed',receipt_url:'https://example.test/receipt'}]});
  assert(billingList.innerHTML.includes('Payment failed'));
  assert(!billingList.innerHTML.includes('> Receipt</a>'));
  context.renderBillingHistory({invoices:[{created:1,amount:14.99,status:'succeeded',receipt_url:'https://example.test/receipt'}]});
  assert(billingList.innerHTML.includes('Paid'));
  assert(billingList.innerHTML.includes('> Receipt</a>'));
  console.log('Portal return, safe redirect, retry state, matrix labels and retired-plan protections passed');
})();
