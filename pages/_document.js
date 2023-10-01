import Document , {Html ,Head , Main , NextScript } from "next/document";

class MyDocument extends Document{

     render(){
          return(
               <Html lang="fa" dir="rtl">
                    <Head>
                         <meta name="author" content="Nader Jafarpour"/>
                    </Head>
                    <body>
                         <h1>نادر جعفرپور</h1>
                         <Main/>
                         <NextScript/>
                    </body>
               </Html>
          )
     }
}

export default MyDocument;