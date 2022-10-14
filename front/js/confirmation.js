const productOrderId = window.location.search.split("?id=").join("");
document.querySelector("#orderId").innerHTML = productOrderId;