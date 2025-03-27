const fs =require("fs");
const path = require("path");

const filePath = path.join(__dirname, "notlar.json");

// dosya yoksa oluştur

if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath, "[]", "utf8");
}


//Not Eklenmesi
function notEkle(notMetni){
    try{
        const notlar =JSON.parse(fs.readFileSync(filePath,"utf8"));
        const yeniNot={
            id: notlar.length> 0? Math.max(...notlar.map(n=>n.id))+1:1,
            metin:notMetni
        };
        notlar.push(yeniNot);
        fs.writeFileSync(filePath,JSON.stringify(notlar,null,2));
        console.log("Not Başarıyla Eklendi. ID:${yeniNot.id}");

    }catch(error){
        console.error("Not Eklenirken hata oluştu:",  error .message);
    }
}

//Notları Listele

function notlarıListele(){
    try{
        const notlar =JSON.parse(fs.readFileSync(filePath, "utf8"));
        if(notlar.length === 0){
            console.log("Henüz Hiç Not Eklenmedi.");
            return;
        }
        notlar.forEach(not => {
            console.log("${not.id} - ${not.metin}");
        });
    } catch(error){
        console.error("Notlar Lislelenirken hata oluştu:", error.message);
    }
}

//Silme İşlemi

function notSil(id){
    try {
        const notlar = JSON.parse(fs.readFileSync(filePath,"utf8"));
        const silinecekIndex= notlar.findIndex(not => not.id === parseInt(id));

        if(silinecekIndex === -1){
            console.log("ID'si ${id} olan bir not bulunamadı!");
            return;
        }

        const silinenNot = notlar.splice(silinecekIndex,1)[0];

        fs.writeFileSync(filePath, JSON.stringify(notlar,null,2));
        console.log(`ID'si ${id} olan not başarıyla silindi.`);
    }catch(error){
        console.error("Not silinirken bir hata oluştu! : " , error.message);
    }
}

//Komut satıra argüman işleme

const args = process.argv.slice(2);
const komut = args [0];

switch(komut){
    case "ekle":
        if(!args[1]){
            console.log("Hata: Eklenecek not belirtilmedi.");
            console.log(`Kullanım:node index.js ekle"Not Metni"`);
           break; 
        }
        notEkle(args[1]);
        break;
        case"listele":
        notlarıListele();
        break;
        case"sil":
        if(!args[1]){
            console.log("Hata: Silinecek not ID'si belirtilmedi.");
            console.log("Kullanım:node index.js sil <id>");
            break;
        }
        notSil(args[1]);
        break;
        default:
            console.log("Geçersiz komut. Kullanaılabilir komutlar:");
            console.log(`node index.js ekle "Not Metni"`);
            console.log("node index.js listele");
            console.log("node index.js sil <id>");





 





}

