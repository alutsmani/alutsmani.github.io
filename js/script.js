
// ------------------ Fungsi yg berkaitan dengan handle search --------------------







// ------------------ Fungsi yg berkaitan dengan render data --------------------
function createSpan(className, textContent) {
    const span = document.createElement('span');
    span.classList.add(className);
    span.textContent = textContent;
    return span;
}


// Fungsi tambahan untuk menambahkan baris data ke dalam tabel
function addDataRow(tbody, label, detail) {
    const row = document.createElement('tr');
    const labelCell = document.createElement('td');
    labelCell.textContent = label;
    const detailCell = document.createElement('td');
    detailCell.textContent = detail;
    row.appendChild(labelCell);
    row.appendChild(detailCell);
    tbody.appendChild(row);
}

let checkboxUpdateQueue = [];
let debounceTimeouts = {};
let totalCheckboxes = 0;

function addCheckbox(container, name, opsi, checked, nik, ids, labelValue) {
    const checkboxWrapper = document.createElement('div');
    checkboxWrapper.classList.add('checkbox-wrapper');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = checked;
    checkbox.addEventListener('change', function() {
        queueCheckboxStatus(nik, ids, name, checkbox.checked);
    });

    const label = document.createElement('label');
    label.textContent = `${opsi} : ${labelValue}`;

    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(label);
    container.appendChild(checkboxWrapper);
}