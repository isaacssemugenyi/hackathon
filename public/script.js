  let bankpayform=document.getElementById('bankpay')
  let selectpaybutton=document.getElementById('selectpay')
  let banktransferbtn=document.getElementById('bank-transfer-btn')
  selectpaybutton.onclick=function(){
  bankpayform.style.display='block'
  }
  banktransferbtn.onclick=function(){
  bankpayform.style.display='none'
  }
  function notification (){
  let bank=document.getElementById('bank').value;
  let amount=document.getElementById('amount').value;
  alert(`transfer shs ${amount}from ${bank}`)
  }