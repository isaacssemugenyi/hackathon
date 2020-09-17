let bankpayform = document.getElementById("bankpay");
let selectpaybutton = document.getElementById("selectpay");
let banktransferbtn = document.getElementById("bank-transfer-btn");
// selectpaybutton.onclick = function () {
//   bankpayform.style.display = "block";
// };
banktransferbtn.onclick = function () {
  bankpayform.style.display = "none";
};

// banking notification
function bnotification() {
  // let bank=document.getElementById('bank').value;
  let amount = document.getElementById("bamount").value;
  //   alert(`transfer shs ${amount} from ${bank}`)
  if (amount.length !== "") {
    confirm(`You are about to make a deposit of ${amount}, Are you sure?`);
  }
}

// mobile money notification
function mnotification() {
  // let bank=document.getElementById('bank').value;
  let amount = document.getElementById("mamount").value;
  //   alert(`transfer shs ${amount} from ${bank}`)
  if (amount.length !== "") {
    confirm(`You are about to make a deposit of ${amount}, Are you sure?`);
  }
}
