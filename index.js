
// Fungsi untuk menangani perpindahan nilai NIK ke tombol
function validateNIK(input) {
    // Menghapus karakter selain angka
    input.value = input.value.replace(/\D/g, '');
    var daftarButton = document.querySelector(".btn-primary");

    // Memeriksa panjang teks
    if (input.value.length === 16) {
        input.style.border = '';

        daftarButton.classList.remove("hidden");
        daftarButton.classList.add("visible");

    } else {
            // Menghapus warna border jika panjang teks mencukupi
        input.style.border = '2px solid red';
        
        daftarButton.classList.remove("visible");
        daftarButton.classList.add("hidden");
    }

}

function onNIKInput() {

    var biodataElements = document.getElementsByClassName("Biodata");

    for (var i = 0; i < biodataElements.length; i++) {
        var biodata = biodataElements[i];
        // Menambahkan class "visible" untuk menampilkan dengan animasi
        biodata.classList.remove("hidden");
        biodata.classList.add("visible");
    }

    var saveButton = document.getElementById('saveButton');
    saveButton.textContent = "Simpan"
    saveButton.disabled = false;

    var inputNIK = $("#NIK").val();

    // Loop melalui setiap elemen dengan class "Biodata"
    $(".Biodata input, .Biodata select").each(function() {
        var inputId = $(this).attr("id");  // Mendapatkan ID input saat ini
        var matchingRow = $("#example").DataTable().rows().data().filter(function (value) {
            return value.NIK === inputNIK;
        })[0];

        if (matchingRow) {
            // Jika NIK ditemukan, isi teksbox atau input date dari input saat ini
            var formattedValue = matchingRow[inputId];
            if (inputId.startsWith("Tanggal") && $(this).attr("type") === "date") {
                // Formatted value harus dalam format "YYYY-MM-DD"
                formattedValue = matchingRow[inputId] !== "" ? formatDateForInputDate(matchingRow[inputId]) : "";
            }

            $(this).val(formattedValue);
        } else {
            // Jika NIK tidak ditemukan, kosongkan teksbox atau input date dari input saat ini
            $(this).val("");
        }
    });

    var daftarButton = document.querySelector(".btn-primary");
    // Menghapus class "visible" dan menambahkan class "hidden" pada tombol daftar
    daftarButton.classList.remove("visible");
    daftarButton.classList.add("hidden");
    
}

function formatDateForInputDate(dateString) {
    // Mengonversi string tanggal ke objek Date
    var dateObject = new Date(dateString);
    // Mengembalikan tanggal dalam format "YYYY-MM-DD"
    return dateObject.toISOString().split('T')[0];
}

function updateTinggalBersama(selectedValue) {
    var BiodataWali = document.getElementById('BiodataWali')


    // Tambahkan kondisi untuk eksekusi kode berdasarkan nilai yang dipilih
    if (selectedValue === "Wali") {
        // Kode yang akan dijalankan jika dipilih "Orang Tua"
        BiodataWali.classList.remove("hidden")
        BiodataWali.classList.add("visible")
    } else {
        // Kode yang akan dijalankan jika dipilih "Wali"
        BiodataWali.classList.remove("visible")
        BiodataWali.classList.add("hidden")
    }
}

function updateMadrasah(selectedValue) {
    var MD = document.getElementById('AsalMadrasah')


    // Tambahkan kondisi untuk eksekusi kode berdasarkan nilai yang dipilih
    if (selectedValue === "Iya") {
        // Kode yang akan dijalankan jika dipilih "Orang Tua"
        MD.classList.remove("hidden")
        MD.classList.add("visible")
    } else {
        // Kode yang akan dijalankan jika dipilih "Wali"
        MD.classList.remove("visible")
        MD.classList.add("hidden")
    }
}

function updateFormal(selectedValue) {
    document.getElementById('Formal').value = selectedValue;
    
    var KelasFormal = document.getElementById('KelasFormal')
    var InformasiTambahan = document.getElementById('InformasiTambahan')

    // Tambahkan kondisi untuk eksekusi kode berdasarkan nilai yang dipilih
    if (selectedValue === "STAI") {
        // Kode yang akan dijalankan jika dipilih "Orang Tua"
        KelasFormal.classList.remove("hidden")
        KelasFormal.classList.add("visible")
        KelasFormal.placeholder = "Prodi"

        InformasiTambahan.classList.remove("hidden")
        InformasiTambahan.classList.add("visible")
    } else {
        // Kode yang akan dijalankan jika dipilih "Wali"
        KelasFormal.classList.remove("visible")
        KelasFormal.classList.add("hidden")

        InformasiTambahan.classList.remove("visible")
        InformasiTambahan.classList.add("hidden")
    }
}

function updateStatusPendaftar(selectedValue) {
    var KelasFormal = document.getElementById('KelasFormal')


    // Tambahkan kondisi untuk eksekusi kode berdasarkan nilai yang dipilih
    if (selectedValue === "Pindah Sekolah") {
        // Kode yang akan dijalankan jika dipilih "Orang Tua"
        KelasFormal.classList.remove("hidden")
        KelasFormal.classList.add("visible")
        KelasFormal.placeholder = "Kelas"
    } else {
        // Kode yang akan dijalankan jika dipilih "Wali"
        KelasFormal.classList.remove("visible")
        KelasFormal.classList.add("hidden")
    }
}

function switchToSelect() {
    //document.getElementById('Formal').classList.add('hidden'); // Menghilangkan input teks
    document.getElementById('MelanjutkanKe').focus(); // Memindahkan fokus ke select
}

function onSimpan() {
    // Menampilkan efek loading
    var loadingSpinner = document.getElementById('loader');
    loadingSpinner.classList.remove('hidden');
                
    
    // Menonaktifkan tombol dan menghilangkan teks
    var saveButton = document.getElementById('saveButton');
    saveButton.textContent = "Menyimpan"
    saveButton.disabled = true;
    
    setTimeout(function() {
    // Mengambil nilai dari elemen input atau formulir di luar class "Biodata"
    var NIK = document.getElementById("NIK").value;

    // Mengumpulkan nilai dari elemen input dalam div dengan class "Biodata"
    var formData = {};
    var biodataElements = document.querySelectorAll('.Biodata input, .Biodata select');

    biodataElements.forEach(function(element) {
        formData[element.id] = element.value;
    });

    
    // Menambahkan NIK ke dalam objek formData
    formData["NIK"] = NIK;

    // Membentuk header data untuk dikirimkan ke server
    var headerData = Object.entries(formData).map(function(entry) {
        return entry[0] + '=' + entry[1];
    }).join('&');

    // Menggunakan fungsi postJSON untuk mengirimkan data ke server
    var response = postJSON(headerData);

    // Tanggapi hasil respons sesuai kebutuhan Anda
    console.log(response);
    alert("Data telah disimpan!");
    
    
    // Menyembunyikan efek loading setelah beberapa waktu (contoh: 2 detik)
    
        loadingSpinner.classList.add('hidden');
        // Mengaktifkan kembali tombol dan menampilkan pesan "Disimpan"
        saveButton.textContent = "Tersimpan"

        var Keterangan3 = document.getElementById('Keterangan3');
        Keterangan3.classList.remove('hidden')
        
    }, 2000);

    
    
    
}


function postJSON(header) {
    // Link Santri Baru
    var url = "https://script.google.com/macros/s/AKfycbz9h4ub2g-h0xOC7DoqH92kuk4IEmcE63wn-ja069iMgCyRDSUxneHLrAfRg9uakqgPNA/exec";

    // Uji Coba untuk Data Santri Baru dan Pembayaran
    //var url = "https://script.google.com/macros/s/AKfycbxTg0jP_YYS6feYyHe-qfmaQBF3rJuQX6hpHvflRX_5jYjRBooU6FxWJeG71gEQKujhYA/exec";



    var xmlhttp = new XMLHttpRequest();

    // Coba mengirim permintaan POST
    try {
        xmlhttp.open("POST", url, false);
        xmlhttp.setRequestHeader("User-Agent", "Mozilla/4.0 (compatible;MSIE 6.0; Windows NT 5.0)");
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send(header);
    } catch (err) {
        return "Error: " + err.message;
    }

    // Periksa apakah pengiriman berhasil
    if (xmlhttp.status !== 200) {
        return "Error: " + xmlhttp.statusText;
    } else {
        // Jika berhasil, kembalikan respons teks
        return xmlhttp.responseText;
    }
}

function onReload() {
    // Mengumpulkan nilai dari elemen input dalam div dengan class "Biodata"
    var biodataElements = document.querySelectorAll('.Biodata input, .Biodata select');
    var formData = {};
    biodataElements.forEach(function(element) {
        formData[element.id] = element.value;
    });

    // Menambahkan kolom "NIK" di posisi pertama
    var tableColumns = [
        {
            title: "NIK",
            data: "NIK", // Pastikan ini sesuai dengan nama properti yang ada di sumber data
        }
    ];

    biodataElements.forEach(function(element) {
        // Menambahkan kolom DataTables secara dinamis
        tableColumns.push({
            title: element.id,
            data: element.id,
        });
    });

    // Inisialisasi DataTables
    var table = $("#example").DataTable({
        ajax: {
            url: "https://script.google.com/macros/s/AKfycbz9h4ub2g-h0xOC7DoqH92kuk4IEmcE63wn-ja069iMgCyRDSUxneHLrAfRg9uakqgPNA/exec",
            data: formData,  // Mengirim data ke server
        },
        columns: tableColumns, // Menggunakan kolom yang telah dibuat
        rowId: "nim",
        liveAjax: true,
    });


    // Menyembunyikan kolom kecuali "NIK" dan "Nama"
    for (var i = 0; i < table.columns().count(); i++) {
        var columnName = table.column(i).header().innerText.trim(); // Mengambil nama kolom
        if (columnName !== "Formal" && columnName !== "Nama") {
            table.column(i).visible(false);
        }
    }


    // Menambahkan class "cool-box" setelah tabel selesai loading
    table.on('init.dt', function () {
        var cool = document.getElementById("KotakLogin");

        // Menghapus class "visible" dan menambahkan class "hidden" pada tombol daftar
        cool.classList.remove("hidden");
        cool.classList.add("visible");

        var daftarButton = document.querySelector(".btn-primary");

        daftarButton.classList.remove("visible");
        daftarButton.classList.add("hidden");

    });
}

$(document).ready(function () {
    onReload();
});



