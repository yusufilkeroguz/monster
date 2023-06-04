# Monster Notebook Case

## Kullanılan Teknolojiler

- [NextJS](https://nextjs.org/) React'ın create-react-app desteğini kaldırdıktan sonra bunu kullanmayı daha doğru görüyorum
- [Storeon](https://github.com/storeon/storeon) Redux mimarisine benzer bir yapı kullanılmıştır. Redux'a göre daha basit ve daha az kod yazmanızı sağlar ve daha küçük bir byte boyutuna sahiptir.
- [TailwindCSS](https://tailwindcss.com/) Tasarımları daha hızlı yapabilmek için kullanılmıştır.

## Kurulum

Bu proje NextJS kullanılarak yapılmıştır. Proje klasörüne girip aşağıdaki komutları çalıştırarak projeyi çalıştırabilirsiniz.

```bash
npm install
npm run dev
```

**---OR--**

```bash
yarn install
yarn dev
```

## Nasıl Çalışır

Proje 3000 portu üzerinden çalışıyor. Dolu ise 3001 üzerinden devam eder. Ordan kontrol edebilirsiniz. Proje başlangıcında `store` klasöründeki store projeye entegre olur. Burada varsayılan olarak `usd` baz alınmıştır ve ilk `currency/fetch/all-currencies` fonksiyonu çalışır. Bu fonksiyon ile tüm para birimlerinin açıklamaları çekilir ve `store`'a kaydedilir. Daha sonra `currency/fetch/exchange-rate` fonksiyonu çalışır ve tüm para birimlerinin döviz kurları çekilir ve `store`'a kaydedilir. Fakat bu fonksiyon her dakika güncelleneceği için her dakika çağıralacak şekilde bir `setInterval` hookundan tekrar çağırılır. Bu işlemler tamamlandıktan sonra `store`'daki `currency` state'i güncellenir. Bu tamamlandıktan sonra eski verilerin ramde yer kaplamaması için `fetchCount` ismindeki değişkenin sayısı baz alınarak 2 önce çekilmiş tüm veriler silinir. Çekilen veriler `Table` componentinde tarafından ekrana bastırılır ve bastırılırken koşullu olarak sınıf eklenir. (Arkası beyaz mı, yeşil mi yoksa kırmızı mı olacak)
