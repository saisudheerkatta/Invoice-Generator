let items = [];

function addItem() {
  const desc = document.getElementById("item-desc").value;
  const price = parseFloat(document.getElementById("item-price").value);

  if (desc && !isNaN(price)) {
    items.push({ desc, price });
    updateInvoice();
    document.getElementById("item-desc").value = "";
    document.getElementById("item-price").value = "";
  } else {
    alert("Please enter valid item and price.");
  }
}

function updateInvoice() {
  const clientName = document.getElementById("client-name").value;
  const taxRate = parseFloat(document.getElementById("tax").value) || 0;
  const clientDisplay = document.getElementById("client-display");
  const itemsList = document.getElementById("items-list");
  const subtotalDisplay = document.getElementById("subtotal");
  const taxAmountDisplay = document.getElementById("tax-amount");
  const totalDisplay = document.getElementById("total");

  clientDisplay.textContent = clientName;
  itemsList.innerHTML = "";

  let subtotal = 0;

  items.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${item.desc}</td><td>$${item.price.toFixed(2)}</td>`;
    itemsList.appendChild(row);
    subtotal += item.price;
  });

  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;

  subtotalDisplay.textContent = subtotal.toFixed(2);
  taxAmountDisplay.textContent = taxAmount.toFixed(2);
  totalDisplay.textContent = total.toFixed(2);
}

function generatePDF() {
  const invoice = document.getElementById("invoice");
  const options = {
    margin: 0.5,
    filename: 'invoice.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(options).from(invoice).save();
}
