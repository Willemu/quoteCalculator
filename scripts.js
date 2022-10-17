//£
let base = {},
    _proj = base.project = {},
    _temp = base.template = {},
    _seo = base.seo = {},
    _rwd = base.rwd = {},
    time = {}
    use = {},
    contact = {}

for(b in base){
  base[b].cost = {}
  base[b].default = {}
}

//PRICE ( costs )

_proj.cost = {
  markup:"5%",
  vat:"20%"
}
_temp.cost = {
  per_custom:75,
  per_page:35,
}
_rwd.cost = {
  mobile_tablet:45,
  wearable:90,
  tv:90
}
_seo.cost = {
  search_engine:30,
  facebook:5,
  twitter:5,
  google_plus:5,
  linked_in:5,
  instagram:5
}

let help_text = {
  pages:{
    heading:"What are Parent pages?",
    body:"Imagine a big cardboard box... Inside that box is a stack of paper, the big box is the parent page, and the stack of paper inside are the sub pages. Typically sub pages are created by you, for example: A 'Shop' page containing products, each product is a sub page.<br><br><b>Tip:</b> Parent pages like; Home, About, Shop, Contact and Blog are often seen on most websites, we recommend 4 main pages because you might not need a Blog if you already have a social media profile."
  },
  templates:{
    heading:"What are Custom templates?",
    body:"Templates are the blueprints of your new website, Templates can be custom, meaning that they will be designed from scratch by our profesional design artists who know how to follow your brands design more closely than with non custom templates."
  },
  seo:{
    heading:"What is seo?",
    body:"Search engine and Social optimization allows your new website to be picked up more efectively by Search engines and shared by Social media platforms, this in turn boosts your vistors and therfore your oportunities to engage with customers.<br><br><b>Tip:</b> We recomend selecting only the social media platforms you use to market your products and also keeping 'Search engines' selected to stay ahead of the competition."
  },
  rwd:{
    heading:"How do devices affect me?",
    body:"Desktop and laptop computer usage is in decline, in 2015 Mobile device web views surpassed desktops and laptops, thats about 66% of the internet's traffic now being viewed on mobile devices,<br><br><b>Tip:</b> we highly recomended that you support as many devices as posible or you will only be reaching 44% of the internet and this number is set to decrease over the coming years."
  }
}

//SETTINGS ( defaults )

//--Project KEYS--
//  .markup
//  .vat

//--Template KEYS--
//  .custom['true']
//  .custom['flase']
//  .recommend
//  .per_page
//  .min

//--SEO KEYS--
//  .search_engine
//  .facebook
//  .twitter
//  .google_plus
//  .linked_in
//  .instagram

//--RWD KEYS--
//  .mobile_tablet
//  .wearable
//  .tv

let _proj_def = _proj.default,
    _temp_def = _temp.default,
    _seo_def = _seo.default,
    _rwd_def = _rwd.default

//Set the defaults for this form

//Project
_proj_def.markup = true
_proj_def.vat = true

//Template
_temp_def.custom = true
_temp_def.recommend = 4
_temp_def.min = 1

//Seo
_seo_def.search_engine = true
_seo_def.facebook = true
_seo_def.twitter = true
_seo_def.google_plus = false
_seo_def.linked_in = false
_seo_def.instagram = false

//Rwd
_rwd_def.mobile_tablet = true
_rwd_def.wearable = false
_rwd_def.tv = false

contact.button = {
  text:"Request call back",
  phone_number:"+447900000000"
}

let el = {
  total:$(".total-heading"),
  temp:$(".custom-template"),
  pages:$(".nth-pages"),
  rwd:$(".rwd-conf"),
  seo:$(".seo-conf"),
  action:$(".call-action"),
  hidden:$(".hidden-totals")
}

//contact button
el.action.find("button.contact")
  .text(contact.button.text)

//time per page - I am not going to extend this but you could use moment js to get better time estimates
time.per_page = 12

let uid = 0
function help_me(el,heading,txtObj){
  uid++
  if(typeof txtObj == "string") txtObj = {text:txtObj}
  else if(typeof txtObj == "object"&&txtObj.text=="undefined") console.log("helo message as object must be: [object.text]")
  $(el).prepend("<button type='button' class='btn btn-default btn-sm info-toggle'/>")
  
  var cl = false
  $(el).find(".info-toggle").click(function(){
    $(this).attr("data-content", txtObj.text)
    $(this).attr("data-heading", heading)
    var par = $(this).parent()
    if(!cl){
      par.addClass("highlight-section")
      par.prepend("<p class='help-text alert alert-info'><b>"+$(this).data().heading+"</b><br>"+$(this).data().content+"</p>")
      cl = true
    }
    else{
      par.removeClass("highlight-section")
      par.find(".help-text").remove()
      cl = false
    }
  })
}

//Help text
help_me(el.temp,help_text.templates.heading,{
  text:help_text.templates.body
})

help_me(el.seo,help_text.seo.heading,{
  text:help_text.seo.body
})

help_me(el.rwd,help_text.rwd.heading,{
  text:help_text.rwd.body
})

help_me(el.pages,help_text.pages.heading,{
  text:help_text.pages.body
})

let calculation = {
  project:0,
  page:0,
  rwd:0,
  seo:0,
}
function total(select,val){
  this[select] = val
  refresh_view()
}
let update = total.bind(calculation)

function refresh_view(){
  let _el = {
    num_main:el.total.find(".cur-main"),
    num_small:el.total.find(".cur-sub"),
    no_vat:el.total.find(".sub-total"),
    h_total:el.hidden.find(".hidden-total"),
    h_sub:el.hidden.find(".hidden-sub-total")
  }
  //display the total
  function moneyFormat(n){
    return n.toFixed(2).replace(/./g, function(c, i, a) {
    return i && c !== "." && ((a.length - i) % 3 === 0) ? + c : c;
  });
  }
  let c = calculation,
      finalTotal = parseInt(c.project+c.page+c.rwd+c.seo)
      //markup
      finalTotal = finalTotal + (parseInt(_proj.cost.markup)/100*finalTotal)
      finalTotal = moneyFormat(finalTotal)
  _el.num_main.text(finalTotal)
  var subTotal = finalTotal-(parseInt(_proj.cost.vat)/100*finalTotal),
      subTotal = moneyFormat(subTotal)
  _el.no_vat.text(subTotal)
  //hidden totals
  _el.h_total.val(finalTotal)
  _el.h_sub.val(subTotal)
}

function ct_update(bool){
  //this = [object: use]
  if(bool == true||bool=="true"){
    _temp.cost.use = _temp.cost.per_custom
  }
  else{
    _temp.cost.use = _temp.cost.per_page
  }
  return _temp.cost.use
}
ct_update(true)

function custom_template(){
  let bound = this,
      defaultTemplateSet = this.default.custom.toString(),
      _el = {
    active:$(el.temp).find("input[value='"+defaultTemplateSet+"']"),
    radio:$(el.temp).find("input[type='radio']"),
    input:el.pages.find('input[data-recieve="btn-math"]')
  }
  //set up the default template setting
  _el.active.prop("checked",true)
  //update the template modifier
  _el.radio.click(function(){
    ct_update($(this).attr("value"))
    update("page",_el.input.val()*_temp.cost.use)//update total and view
  })
}
let custom_template = custom_template.bind(_temp)()

function nth_page(){
  let bound = this
  let _el = {
    add:el.pages.find('.add'),
    sub:el.pages.find('.sub'),
    btn:el.pages.find('.btn-math'),
    input:el.pages.find('input[data-recieve="btn-math"]'),
    lead_time:el.total.find(".est"),
    h_hours:el.hidden.find(".hidden-hours")
  }
  let initial = this.default.recommend,
      min = this.default.min
  //set the value of recomended pages
  _el.input.attr("value",initial)
  
  function lead_time(n){
    _el.lead_time.text(" "+n+" h")
    _el.h_hours.val(n)
  }
  
  function pageTotal(){
    lead_time(initial*time.per_page)
    return update("page",initial*bound.cost.use)
  }
  
  function inputChange(n){
    _el.input.val(n)
  }
  
  _el.input.on("input",function(){
    let n = $(this).val()
    if(/^\d+$/.test(n)){//if number update view
      if(n != 0){
        initial = parseInt(n)
        inputChange(initial) 
      }
      else{
        $(this).val(1)
      }
    }
    pageTotal()
  })
  _el.btn.click(function(){
    if($(this).hasClass(_el.add.attr("class"))){//  +
      initial++
      inputChange(initial)
    }
    else{// -
      if(initial != min){
        initial--
        inputChange(initial)
      }
    }
    pageTotal()
  })
  pageTotal()
}
let page = nth_page.bind(_temp)()

function checkboxes(_key){
  let defaults = this.default,
      bound = this,
      tmpObj = {}
  for(d in defaults){//checked or unchecked
    let checkbox_all = $("."+d.replace(/\_/g,"-"))
    checkbox_all.prop("checked",defaults[d])
    //initially add checked prices
    if(checkbox_all.prop("checked")){
     tmpObj[d] = bound.cost[$("."+d.replace(/\_/g,"-")).attr("class").replace(/\-/g,"_")] 
    }
  }
  function mathKeyPrice(obj){
    let initial = 0
    for(n in obj){
      initial += obj[n]
    }
    update(_key,initial)
  }
  let _el = {
    checkbox:el[_key].find("input[type='checkbox']")
  }
  _el.checkbox.click(function(){
    let checkbox_all = $(this).attr("class").replace(/\-/g,"_"),
        price = bound.cost[checkbox_all]
    //checkbox build or delete object keys
    if($(this).prop("checked")) tmpObj[checkbox_all] = price
    else delete tmpObj[checkbox_all]
    mathKeyPrice(tmpObj)
  })
  mathKeyPrice(tmpObj)
}
//Checkboxes
checkboxes.bind(_seo)("seo")
checkboxes.bind(_rwd)("rwd")



$(refresh_view())