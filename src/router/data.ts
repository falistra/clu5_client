const domande = `
<insiemi_domande>

	<domande>
		<sql>SELECT domande.id, domande.specie, domande.data, "tipiDomanda".descrizione AS tipo, autori.descrizione AS autore, livelli.descrizione AS livello
FROM domande JOIN "tipiDomanda" ON domande.tipo = "tipiDomanda".id JOIN autori ON domande.autore = autori.id JOIN livelli ON domande.livello = livelli.id
WHERE domande.attiva = 1 AND domande.lingua = '5' AND domande.id NOT IN ('15505', '15486', '15490', '15491', '15492', '15493', '15503', 15509, 15487, 15498) AND domande.specializzazione = 32 AND domande.id = 15488 ORDER BY rand()
 LIMIT 1</sql>

    <domanda autore="45" id="15031" lingua="1" livello="4" tag="1" tecnica="6">
      <domandaabbinamentomultiplo>
        <prologo>Match ALL 8 options to the corresponding texts by dragging them with the mouse.</prologo>
        <testo>The Four Best Charities in the World, and How Much You Should Give to Each&lt;br&gt;By Chris Weller&lt;br&gt;&lt;br&gt;http://uk.businessinsider.com/the-4-best-charities-in-the-world-and-how-much-you-should-give-to-each-2015-7?r=US&amp;IR=T</testo>
        <coppie tipoopzioni="TESTO" tipoorientamento="VERTICALE" />
        <partiFisse>
          <item hash="37111e41239df58c21b218efc74fab0f">&lt;strong&gt;Against Malaria Foundation&lt;/strong&gt;&lt;br&gt;&lt;br&gt;Easily the most threatening disease to kids in low-income countries is malaria. Approximately 600,000 people die every year as a result of malaria infection, and the only vaccine that's been approved won't reach patients until 2017.&lt;br&gt;&lt;br&gt;AMF avoids the curative route and instead opts for treatment. To do that, they use insecticide-treated bed nets - mesh tarps that drape over kids' beds and kill mosquitoes as they attempt to enter.&lt;br&gt;&lt;br&gt;GiveWell finds through its research that, based on malaria's prevalence and the low cost of distributing bed nets, AMF is far and away the charity most deserving of people's dollars.&lt;br&gt;&lt;br&gt;Donating $1.50 to AMF can protect one person from malaria for one year. If you're feeling especially generous, however, GiveWell recommends a donation of $3,340. It might seem like a lot, but you'd be saving an entire life.</item>
          <item hash="095507fa0e5d15dabc1643e3be0408b1">&lt;strong&gt;GiveDirectly&lt;/strong&gt;&lt;br&gt;&lt;br&gt;GiveDirectly makes good on its name, becauase its entire mission is giving cash to people who need it in Kenya and Uganda.&lt;br&gt;&lt;br&gt;"We believe that this approach faces an unusually low burden of proof," GiveWell states, "and that the available evidence supports the idea that unconditional cash transfers significantly help people."&lt;br&gt;&lt;br&gt;
    Essentially, GiveDirectly takes the model of giving a beggar on the street your money and reassures donors their money is being used for basic needs, not booze or drugs. Money most often goes toward durable goods like furniture and clothes, healthcare, education, and food.&lt;br&gt;&lt;br&gt;Though there were no observable changes to people's stress levels, research showed their psychological well-beings rose substantially after receiving the donations.&lt;br&gt;&lt;br&gt;
    More good news for donors: GiveDirectly absorbs little for overhead. Approximately 87% of donations go directly to a family in poverty.</item>
          <item hash="d0f534a31ea65d70eaf1d3bafb6d2b45">&lt;strong&gt;Schistosomiasis Control Initiative&lt;/strong&gt;&lt;br&gt;&lt;br&gt;Roughly 240 million people live with parasitic worm infections, and 90% of those cases occur in just 20 countries.&lt;br&gt;&lt;br&gt;Thankfully, GiveWell finds that approximately $1.23 can rid a child of these worms.&lt;br&gt;&lt;br&gt;"This cost is based on several difficult-to-estimate inputs including (a) how to account for donated drugs and (b) the portion of costs paid for by the governments with which SCI works," GiveWell states. The cost is several times greater than DtWI's cost because SCI deals primarily in regions where the deadliest worms are more prevalent, typically in sub-Saharan Africa.&lt;br&gt;&lt;br&gt;Few countries are wealthy enough to create the infrastructure on their own. SCI is so valuable because the ceiling for support is so high.</item>
          <item hash="16c33722cdc3d2e9086ed2829fbe8909">&lt;strong&gt;Deworm the World Initiative&lt;/strong&gt;&lt;br&gt;&lt;br&gt;The Deworm the World Initiative assists government-run programs in schools to strengthen deworming efforts. Most often that relies on pills, which kill the intestinal parasite that enters kids' bodies through unsanity conditions in soil or water.&lt;br&gt;&lt;br&gt;DtWI's main goal is advocating and supporting the programs that deliver kids those pills. GiveWell estimates children can be dewormed for about $0.30 per child all in with DtWI's help, or $0.09 per child if the cost excludes "the value of teachers' and principals' time spent on the program."&lt;br&gt;&lt;br&gt;"Even for small amounts of money you're still giving pills to children," says Sean Conley, a research analyst at GiveWell, "which seem to be making a very big difference in their lives later on."</item>
        </partiFisse>
        <partiMobili>
          <item hash="f159e8b8fd668e8990801e14f43626e0">This organization mainly acts in areas where the most dangerous parasites are more common.</item>
          <item hash="a38fd1d8a1ef2143efc6861ba8213ac0">This organization takes into account other sources of donations as well as government funding when calculating their costs per person helped.</item>
          <item hash="cda20b05919ac1b6f8fd7356faf43df5">This organization helps to fight against the illness most dangerous to children in poor countries.</item>
          <item hash="5fb725d81a7ff6664a5593f238e52035">This organization helps people pay for basic needs.</item>
          <item hash="f9aec90563488b4863067d55173a28f7">Through this organization, even an amount of money under a dollar can help resolve a child's problem.</item>
          <item hash="64474b05eeabba4c5e82de952cba4466">This organization's principal objective is to provide support to programs that directly help children.</item>
          <item hash="98c672e18f56f0884d9ca5881a349bd4">This organization takes a relatively small proportion of the money donated to use for its own costs.</item>
          <item hash="da63db0c52044a4e1c2d8840eb6179a0">This organization chooses to try to prevent infection rather than cure it.</item>
        </partiMobili>
      </domandaabbinamentomultiplo>
    </domanda>



     <domanda autore="12" id="15354" lingua="1" livello="2" tag="26" tecnica="8">
      <domandawordpool>
        <prologo>Trascina tutte le parole date nel riquadro corrispondente.</prologo>
        <testo>Domanda 22</testo>
        <pools>
          <pool hash="5110efca9d8f2ed8f26a5a3917c3ffe1">Respiratory system</pool>
          <pool hash="fd277af096dacb6fd3f045253e5ac244">Digestive system</pool>
          <pool hash="d36f5a5121e20e95b119fd6f2954b8c9">Circulatory system</pool>
        </pools>
        <words>
          <word hash="fd951d4d187b5063794700abb97f28dd"> gall bladder</word>
          <word hash="d1703a4d03487550dd21062fe5c2a3d8"> stomach</word>
          <word hash="db879dedf7673953ba0f17f04294a551"> vein</word>
          <word hash="41d1de28e96dc1cde568d3b068fa17bb">nose</word>
          <word hash="a320ef5c460a53a2d01c52cd8b21eec2">bronchus</word>
          <word hash="7861e915d9b0f9854fb388c88a61e551">clot</word>
          <word hash="f2f6c6fcc9d771590942e476e9f729bf">trachea</word>
          <word hash="ffec601cfe7073a232acf220615a26db"> capillary</word>
          <word hash="0d39a370788dac64c3c783a3cdbb6f97"> carbon dioxide</word>
          <word hash="3a6621ffc8a329b0fd4cd8115990ba23"> air</word>
          <word hash="e420b3e5c9ce703b57d859329a3a806a"> liver</word>
          <word hash="a1c929100243c5ec8aef34e0a4e80d2c"> blood pressure</word>
          <word hash="83739245016cac2af442a5aaac18a791"> thorax</word>
          <word hash="3e7ea6a86117122b7b47cab77b3f9e47">pancreas</word>
          <word hash="6124d98749365e3db2c9e5b27ca04db6">oxygen</word>
          <word hash="b2ad40115c594fdddb73b9f7660a93a7"> pulse</word>
        </words>
      </domandawordpool>
    </domanda>

    <domanda autore="14" id="14565" lingua="2" livello="2" tag="2" tecnica="3">
      <domandasceltamultipla risposteCorrette="4">
        <prologo>&amp;nbsp;Ascoltate la registrazione.</prologo>
        <testo>Cliccate sulle &lt;strong&gt;4 opzioni corrette&lt;/strong&gt;.</testo>
        <audio nrMaxRipetizioni="2" url="tmpaDlnFx.ogg" />
        <immagine />
        <risposte tipoopzioni="TESTO">
          <risposta hash="f8e94c0a5b2d7aa01c13a1a329db6cc9" tipo="TESTO">Brigitte dit que sa vie a changé</risposta>
          <risposta hash="06748aa0c76aff6f9517d9af11ba9b6f" tipo="TESTO">Brigitte et Pascal vivent ensemble depuis 3 mois</risposta>
          <risposta hash="1fc1aec173a25bb35ae88654e2d65664" tipo="TESTO">Sophie semble heureuse d'avoir des nouvelles de Brigitte</risposta>
          <risposta hash="4605e159555ca77fec788d73b998efe6" tipo="TESTO">Samedi, Brigitte ira faire des achats avec son compagnon</risposta>
          <risposta hash="a8e8b28f4ac52fada6619c96b04d310e" tipo="TESTO">Brigitte a toujours été ponctuelle</risposta>
          <risposta hash="95c7421056318b57dc5d703d0da6bed2" tipo="TESTO">Le 18ème arrondissement est un quartier agréable</risposta>
        </risposte>
      </domandasceltamultipla>
    </domanda>

    <domanda autore="14" id="14041" lingua="2" livello="2" tag="1" tecnica="4">
      <domandariordino>
        <prologo>&amp;nbsp;Riordinate la lettera di candidatura.</prologo>
        <testo>Risposta a una proposta di lavoro.</testo>
        <audio nrmaxripetizioni="2" url="nessuno" />
        <risposte tipoopzioni="TESTO">
          <risposta hash="733de62c00e127f417ecd0c08fa41ffb">Madame,</risposta>
          <risposta hash="1dbf7f57975388cd43b43b0529ea7877">J'ai bon espoir que mon profil puisse retenir votre attention, c'est pouquoi, dans l'attente de vous rencontrer directement, je vous prie d'agréer, Madame, mes meilleurs salutations.</risposta>
          <risposta hash="d235792234caa9238f98182d33daf43f">Je possède une bonne expérience puisque lors de mes trois années d'études, j'ai eu la chance de garder 2 jumeaux de 3 mois jusqu'à leur insertion en crèche. Je suis calme, ponctuelle, passionnée par mon futur métier et disponible à n'importe quel horaire puisque j'ai choisi une modalité de cours à distance.</risposta>
          <risposta hash="2937608e8842bbd2d2096c79d3d0624f">Diplomée de l'école d'infirmière, je fréquente actuellement une école de puéricultrice à Strasbourg et souhaite garder de très jeunes enfants afin de subvenir en partie à mes besoins et de développer mon sens du contact avec les bébés.</risposta>
          <risposta hash="01042418711c0df61d5b191be9426041">Suite à votre annonce parue le 4 mai dernier dans les DNA, je me permets de vous envoyer ma candidature pour la garde de votre bébé de 10 mois essentiellement tous les matins de 7h à 11h.</risposta>
        </risposte>
      </domandariordino>
    </domanda>

		<domanda autore="Stafano Garuti" id="15488" livello="A2" peso="2.5" tag="PRA_scopo_disc" tecnica="5">
			<domandaabbinamentosingolo>
				<prologo>Collega le frasi a sinistra con &lt;u&gt;una sola&lt;/u&gt; delle frasi a destra.&lt;br&gt;</prologo>
				<testo>[object Object]</testo>
				<coppie tipoopzioni="TESTO" tipoorientamento="VERTICALE" />
				<partiFisse>
					<item hash="5d2c75440444293c6c3798fc18eb5c18">Come ti sembra la pasta al pesto?</item>
					<item hash="5487dc55d9449a6fb420904d2ece4de5">Giorgio, accompagni Simona a casa?</item>
					<item hash="a525451d51f874986c99f0e769eafe0e">Mi dà due chili d'uva, per cortesia?</item>
					<item hash="99158e5645fd725eda1c6cf9d141baca">Com'è la zona dove abita Sergio?</item>
					<item hash="9cc812ecf75dc0bd6bd5bf363c78a696">Ieri mia sorella si è laureata in storia dell'arte.</item>
				</partiFisse>
				<partiMobili>
					<item hash="6055ede7259402afb15935cb422ea5d4">Condoglianze!</item>
					<item hash="6320e3d2bf5f71d0d88a5696e0eaae71">La adoro! Complimenti!</item>
					<item hash="e0a23662d404595c8691147157d08296">Come no! La vuole bianca o nera?</item>
					<item hash="ddffe18c648449c6d9a435d72f8530de">Congratulazioni!</item>
					<item hash="cfa1ce4971fa304f16f2543996e597f6">Lo voglio regalare a mio padre.</item>
					<item hash="242e672a7a78e2a79dfde51099b0fa04">Non molto, tre o quattro volte all'anno.</item>
					<item hash="79bdf4b1fc4565601b319d5f7933d729">No, non lo conosco.</item>
					<item hash="77608911755a5b40d09d72089ca1227b">Sembra tranquilla, si trova molto bene.</item>
					<item hash="d58337d8fea40eaf8ee4f91e301e9f36">Volentieri, la porto subito!</item>
				</partiMobili>
			</domandaabbinamentosingolo>
		</domanda>
	</domande>



  <domande>
		<sql>SELECT domande.id, domande.specie, domande.data, "tipiDomanda".descrizione AS tipo, autori.descrizione AS autore, livelli.descrizione AS livello
FROM domande JOIN "tipiDomanda" ON domande.tipo = "tipiDomanda".id JOIN autori ON domande.autore = autori.id JOIN livelli ON domande.livello = livelli.id
WHERE domande.attiva = 1 AND domande.lingua = '1' AND domande.id NOT IN (14435, 6239, 7032, 6881, 7017, 6960, 2295, 6971, 11560, 7373) AND domande.livello = 2 AND domande.specie = 5 AND domande.tipo = 28 AND domande.specializzazione = 1 ORDER BY rand()
 LIMIT 1</sql>
		<domanda autore="Robin Evers" id="14453" livello="A2" peso="1" tag="LG_lex_img" tecnica="5">
			<domandaabbinamentosingolo>
				<prologo>Abbina ad ogni immagine una sola descrizione trascinandola con il mouse.</prologo>
				<testo>words with "book"</testo>
				<coppie tipoopzioni="IMMAGINE" tipoorientamento="VERTICALE" />
				<partiFisse>
					<item hash="cd343f8e1af28e50143bf75d9d405b1c">tmprYtNDH.jpg</item>
					<item hash="c68134d2411d9aae9e64257cc53b2b33">tmprrzH6c.jpg</item>
					<item hash="ee27055341a3443dce3263aafb8605b2">tmpLKwW4y.jpg</item>
					<item hash="5d83e72e672beb5a161871a0532c3ebb">tmprRiULo.jpg</item>
				</partiFisse>
				<partiMobili>
					<item hash="fb5d1b4a2312e239652b13a24ed9a74f">notebook</item>
					<item hash="b75624ce7f285ca15322ab80d4d54565">bookshelf</item>
					<item hash="2a4a0bf95d32e1e3699eb55927334851">bookshop</item>
					<item hash="994d5713c92167a0051cb7baaa2c312a">textbook</item>
					<item hash="4684cddc2fdd1f00234aca819c872304">ebook</item>
					<item hash="796ab53acf966fbacf8f078ecd10a9ce">bookcase</item>
				</partiMobili>
			</domandaabbinamentosingolo>
		</domanda>
	</domande>

	<domande>
		<sql>SELECT domande.id, domande.specie, domande.data, "tipiDomanda".descrizione AS tipo, autori.descrizione AS autore, livelli.descrizione AS livello
FROM domande JOIN "tipiDomanda" ON domande.tipo = "tipiDomanda".id JOIN autori ON domande.autore = autori.id JOIN livelli ON domande.livello = livelli.id
WHERE domande.attiva = 1 AND domande.lingua = '5' AND domande.id NOT IN ('15505', '15486', '15490', '15491', '15492', '15493', '15503') AND domande.specializzazione = 32 AND domande.id = 15509 ORDER BY rand()
 LIMIT 1</sql>
		<domanda autore="Alessandra Marazzi" id="15509" livello="A2" peso="5" tag="LG_temp" tecnica="12">
			<domandariempimentotestolibero>
				<prologo>Leggi il testo e coniuga i verbi al tempo giusto.</prologo>
				<testo> Cara Francesca, come (0. stare) __stai___? Io abbastanza bene, sono sempre molto impegnata. Oggi però (essere) ___01____ a casa dal lavoro e così ho tempo per scriverti.La settimana scorsa (passare) ___02___ dai miei genitori e mia madre (dire) ___03___ che ti (vedere) ___04___ al supermercato un po' di tempo fa e che vuoi sapere qualcosa della mia nuova vita. Qui a Milano va tutto bene, di solito (alzarsi) ___05____ alle 6.00 la mattina per avere un po' di tempo per me: (andare) ___06___ spesso al parco a correre o a fare un po' di ginnastica. Soprattutto mi (piacere) ___07___ molto il mio lavoro, ho un collega molto simpatico che (lavorare) ___08___ con me, adesso (dovere) ___09___ fare un progetto insieme e sono felice perchè lui è davvero bravo.&lt;/p&gt;&lt;p&gt;Milano (essere) ___10___ una città piena di vita, e solo lo scorso fine settimana io e una mia coinquilina (andare) ___11___ a sentire un concerto e a visitare due mostre a Palazzo Reale. La mostra su Picasso mi (piacere) ___12___ tantissimo! E martedì scorso io (iscriversi) ___13___ a un corso di yoga. Purtroppo invece ieri (rimanere) ___14___ a casa perchè ho avuto la febbre, ma, almeno, così (svegliarsi) ___15___ tardi e (mettere) ___16___ in ordine la casa.&lt;/p&gt;&lt;p&gt;Perchè la prossima settimana non (venire) ___17___ a Milano a trovarmi? A casa nostra (esserci) ___18___ una camera libera quindi (potere) ___19___ dormire qui: sai quanto (costare) ___20___ gli alberghi a Milano!&lt;/p&gt;&lt;p&gt;Fammi sapere! Ci sentiamo presto!&lt;/p&gt;&lt;p&gt;Un abbraccio&lt;/p&gt;&lt;p&gt;Sonia&lt;/p&gt;</testo>
			</domandariempimentotestolibero>
		</domanda>
	</domande>


<domande>
		<sql>SELECT domande.id, domande.specie, domande.data, "tipiDomanda".descrizione AS tipo, autori.descrizione AS autore, livelli.descrizione AS livello
FROM domande JOIN "tipiDomanda" ON domande.tipo = "tipiDomanda".id JOIN autori ON domande.autore = autori.id JOIN livelli ON domande.livello = livelli.id
WHERE domande.attiva = 1 AND domande.lingua = '1' AND domande.livello = 2 AND domande.specie = 7 AND (domande.tipo = 4 OR domande.tipo = 5 OR domande.tipo = 6 OR domande.tipo = 7 OR domande.tipo = 8 OR domande.tipo = 9 OR domande.tipo = 10 OR domande.tipo = 11 OR domande.tipo = 12 OR domande.tipo = 17 OR domande.tipo = 18 OR domande.tipo = 19 OR domande.tipo = 20 OR domande.tipo = 21 OR domande.tipo = 22 OR domande.tipo = 23 OR domande.tipo = 24 OR domande.tipo = 25) AND domande.specializzazione = 1 ORDER BY rand()
 LIMIT 2</sql>
		<domanda autore="Robin Evers" id="14435" livello="A2" peso="1" tag="LG_temp" tecnica="7">
			<domandariempimentotesto>
				<prologo>&amp;nbsp;Trascina l'opzione corretta in ogni spazio.</prologo>
				<testo>OBESITY IN MEXICO&lt;br&gt;&lt;br&gt;Mexico is a country with the second highest rate of obesity. The government says that around 37 million Mexicans are obese.&lt;br&gt;&lt;br&gt;The government wants to help these obese people &#x2013; it ___1___ 30 health stations in 21 Metrobus stations in Mexico City. When somebody ___2___ in front of the station, it tells the person to do 10 squats. While you exercise, the station ___3___ you some advice on how to live a healthy life. When you%u2019re finished with the squats, the station gives you a free ticket!&lt;br&gt;&lt;br&gt;Experts ___4___ that so many people in Mexico are obese because of unhealthy food and drinks.</testo>
				<risposte>
					<risposta hash="74c6abe13f6fc1bafd3575a8d055c56d">helps</risposta>
					<risposta hash="84eeb81e61c76ad3f4103b0b051c7021">says</risposta>
					<risposta hash="a53ff64efd169c1b4d085d6e7075c8d7">say</risposta>
					<risposta hash="8e13ffc9fd9d6a6761231a764bdf106b">put</risposta>
					<risposta hash="0a7cbd25cb6eac751b588dd3b21059e9">walks</risposta>
					<risposta hash="3674478d09da161a0fa409f7c30380ee">gives</risposta>
				</risposte>
			</domandariempimentotesto>
		</domanda>
		<domanda autore="Clare Darby" id="6239" livello="A2" peso="1" tag="LG_modal" tecnica="7">
			<domandariempimentotesto>
				<prologo>&amp;nbsp;Trascina l'opzione corretta in ogni spazio.</prologo>
				<testo>We ______1______ go and see Jeremy and Sarah this summer when we go to Edinburgh. They ______2______ certainly be at home when we are there on holiday. ______3______ I send them an email giving them the details of our stay in Edinburgh? We have a hotel booking so of course we ______4______stay with them - just dinner together one evening. What do you think?</testo>
				<risposte>
					<risposta hash="eeaba41a1b7e3f05b37a52ed30243699">shall</risposta>
					<risposta hash="b7a61cf5d29e4ad809c301c74229b078">won't</risposta>
					<risposta hash="18218139eec55d83cf82679934e5cd75">will</risposta>
					<risposta hash="9a4b6f884971dcb4a5172876b335baab">may</risposta>
					<risposta hash="f5f6bb1f79415f96d11a1f75d9b7dfbe">mustn't</risposta>
					<risposta hash="d0e6ef34e76c41b0fac84f608289d013">must</risposta>
				</risposte>
			</domandariempimentotesto>
		</domanda>
	</domande>

	<domande>
		<sql>SELECT domande.id, domande.specie, domande.data, "tipiDomanda".descrizione AS tipo, autori.descrizione AS autore, livelli.descrizione AS livello
FROM domande JOIN "tipiDomanda" ON domande.tipo = "tipiDomanda".id JOIN autori ON domande.autore = autori.id JOIN livelli ON domande.livello = livelli.id
WHERE domande.attiva = 1 AND domande.lingua = '5' AND domande.id NOT IN ('15505', '15486', '15490', '15491', '15492', '15493', '15503', 15509) AND domande.specializzazione = 32 AND domande.id = 15487 ORDER BY rand()
 LIMIT 1</sql>
		<domanda autore="Stafano Garuti" id="15487" livello="A2" peso="50" tag="LG_frasi" tecnica="11">
			<domandariempimentolibero>
				<prologo>Completa i dialoghi con la parola o la frase adatte.&lt;br&gt;</prologo>
				<testo>&lt;p&gt;&lt;b&gt;A. Alla stazione dei treni&lt;/b&gt;&lt;br&gt;&lt;/p&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;p&gt;&lt;b&gt;Cliente&lt;/b&gt;:&amp;nbsp;&amp;nbsp;&amp;nbsp; Buongiorno. (FRASE) ________________________1____________________________ per Milano, per favore.&lt;/p&gt;&lt;p&gt;&lt;b&gt;Impiegato&lt;/b&gt;:&amp;nbsp; Solo andata?&lt;/p&gt;&lt;p&gt;&lt;b&gt;Cliente&lt;/b&gt;: No, (FRASE) __________2_________. A che ora parte il treno?&lt;/p&gt;&lt;p&gt;&lt;b&gt;Impiegato&lt;/b&gt;: Ci sono due treni: il Regionale Veloce delle 14.20 e il Frecciabianca delle 15.00.&lt;/p&gt;&lt;p&gt;&lt;b&gt;Cliente&lt;/b&gt;: (FRASE) _________3__________?&lt;/p&gt;&lt;p&gt;&lt;b&gt;Impiegato&lt;/b&gt;: Con il Regionale Veloce ci vogliono 1 ore e 20, con il Frecciabianca 1 ora e 45.&lt;/p&gt;&lt;p&gt;&lt;b&gt;Cliente&lt;/b&gt;: Prendo (FRASE) _________4___________, vorrei arrivare a Milano prima possibile. &lt;/p&gt;&lt;p&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp; (FRASE) _________5_______________?&lt;/p&gt;&lt;p&gt;&lt;b&gt;Impiegato&lt;/b&gt;: No, il treno è diretto. (FRASE) ________6_______?&lt;/p&gt;&lt;p&gt;&lt;b&gt;Cliente&lt;/b&gt;: Seconda. (FRASE) _______7_______?&lt;/p&gt;&lt;p&gt;&lt;b&gt;Impiegato&lt;/b&gt;: Sono 28 euro e 25 centesimi.&lt;/p&gt;&lt;p&gt;&lt;b&gt;Cliente&lt;/b&gt;: (FRASE) _____8_______. Scusi, un'ultima informazione: (FRASE) ____9_______?&lt;/p&gt;&lt;p&gt;&lt;b&gt;Impiegato&lt;/b&gt;: Dal binario 3.&lt;/p&gt;&lt;p&gt;&lt;b&gt;Cliente&lt;/b&gt;: (FRASE) ______10_______&lt;/p&gt;&lt;p&gt;&lt;b&gt;Impiegato&lt;/b&gt;: Arrivederci e buon viaggio.&lt;br&gt;&lt;/p&gt;</testo>
			</domandariempimentolibero>
		</domanda>
	</domande>


  	<domande>
		<sql>SELECT domande.id, domande.specie, domande.data, "tipiDomanda".descrizione AS tipo, autori.descrizione AS autore, livelli.descrizione AS livello
FROM domande JOIN "tipiDomanda" ON domande.tipo = "tipiDomanda".id JOIN autori ON domande.autore = autori.id JOIN livelli ON domande.livello = livelli.id
WHERE domande.attiva = 1 AND domande.lingua = '5' AND domande.id NOT IN ('15505', '15486', '15490', '15491', '15492', '15493', '15503', 15509, 15487, 15498, 15488) AND domande.specializzazione = 32 AND domande.id = 15489 ORDER BY rand()
 LIMIT 1</sql>
		<domanda autore="Stafano Garuti" id="15489" livello="A2" peso="50" tag="SCRITTURA" tecnica="10">
			<domandascritturalibera>
				<prologo>Cos'ha fatto Giacomo ieri? &lt;br&gt;</prologo>
				<testo>Guarda le immagini e scrivi &lt;u&gt;&lt;b&gt;cinque &lt;/b&gt;&lt;/u&gt;frasi. Devi scrivere tutto quello che ha fatto ( da a. ad h.).</testo>
				<immagine url="tmp_xu6oqmy.uso_della_lingua_classe_1_15489.png" />
			</domandascritturalibera>
		</domanda>
	</domande>




<domande>
		<sql>SELECT domande.id, domande.specie, domande.data, "tipiDomanda".descrizione AS tipo, autori.descrizione AS autore, livelli.descrizione AS livello
FROM domande JOIN "tipiDomanda" ON domande.tipo = "tipiDomanda".id JOIN autori ON domande.autore = autori.id JOIN livelli ON domande.livello = livelli.id
WHERE domande.attiva = 1 AND domande.lingua = '1' AND domande.id NOT IN (14435, 6239, 7032, 6881, 7017, 6960, 2295, 6971, 11560, 7373, 14453, 4063, 12101, 4066) AND domande.livello = 2 AND domande.specie = 2 AND domande.tipo = 1 AND domande.specializzazione = 1 ORDER BY rand()
 LIMIT 1</sql>
		<domanda autore="Clare Darby" id="8505" livello="A2" peso="5" tag="LETTURA" tecnica="2">
			<domandacomprensionetesto>
				<prologo>&amp;nbsp;Leggi il testo e rispondi alle 5 domande cliccando sull'opzione corretta.</prologo>
				<testo_comprensione>&lt;strong&gt;An introduction to Scouting&lt;/strong&gt;&lt;br&gt;&lt;br&gt;&lt;br&gt;The Scout Association in the United Kingdom organises adventure activities and personal development opportunities for 400,000 young people aged 6-25. %u2018Personal development%u2019 means encouraging and stimulating the physical, intellectual, social and spiritual welfare of the individual. We want to help our members realise their full potential as individuals, as responsible citizens and as members of their local, national and international communities. &lt;br&gt;&lt;br&gt;It is true that we can%u2019t solve all the problems in the world but we can help to make it a better place. Scouting makes a positive contribution to society by helping young people to become independent and responsible. Young people enjoy learning by working in partnership with adults. They participate in a variety of activities and new experiences, exploring the outdoors and working in teams. &lt;br&gt;&lt;br&gt;Our method for giving young people the opportunity to learn is by offering a continuous progression of training, activities and awards that include everything that young people do in Scouting from the age of 6 to 25.&lt;br&gt;&lt;br&gt;In Scouting, our adults have a responsibility to make sure that the programmes offered are fun and exciting and guarantee that all our activities are safe and that our members are not in any way exposed to risk. &lt;br&gt;&lt;br&gt;The Scout Association is the largest co-educational youth organisation in the world. Internationally, we have over 28 million young members in 216 countries. About 65% of the international membership is in developing countries.&amp;nbsp; &lt;br&gt;&lt;br&gt;Scouting is open to all young people aged 6 to 25 of every religious and cultural background. There are also many opportunities for adults to become Leaders, Assistants or Administrators.&lt;br&gt;&lt;br&gt;&lt;br&gt;Adapted and simplified from https://members.scouts.org.uk/</testo_comprensione>
				<domande>
					<domandasceltasingola hash="088966bcd91fd0d625fc8f84b354a1d7">
						<prologo />
						<testo>&amp;nbsp;Under half a million people in the UK:</testo>
						<risposte tipoopzioni="TESTO">
							<risposta hash="e1ec1db459550f92240d325bedf03467" tipo="TESTO">are adolescents</risposta>
							<risposta hash="775f6e62b85a1b5bfe1daf2937e5fa52" tipo="TESTO">are scouts</risposta>
							<risposta hash="0880a95600cff13ee2a1094d7e67eed1" tipo="TESTO">organize scout activities</risposta>
						</risposte>
					</domandasceltasingola>
					<domandasceltasingola hash="c35cea01b134c6bdab01b8f0d84cdb35">
						<prologo />
						<testo>&amp;nbsp;Scouts are encouraged:&lt;br&gt;</testo>
						<risposte tipoopzioni="TESTO">
							<risposta hash="98cac2204c2a322deb68436be4720780" tipo="TESTO">to solve all the problems in the world</risposta>
							<risposta hash="451f17019d806004d2ff525017c97d8a" tipo="TESTO">to depend on adults</risposta>
							<risposta hash="cb28fda82f5d43c9e32786855924dba7" tipo="TESTO">to be autonomous</risposta>
						</risposte>
					</domandasceltasingola>
					<domandasceltasingola hash="43de205949bae71c565840b41cf0d0a6">
						<prologo />
						<testo>&amp;nbsp;Scouts are gradually given:</testo>
						<risposte tipoopzioni="TESTO">
							<risposta hash="874e24a0cd81b13065295c65481ad18e" tipo="TESTO">more dangerous activities</risposta>
							<risposta hash="8015883e2727b5bf5ed0d1c073dccf79" tipo="TESTO">prizes for learning</risposta>
							<risposta hash="7ffdcf54546b75520b930e5353c71f42" tipo="TESTO">more teamwork</risposta>
						</risposte>
					</domandasceltasingola>
					<domandasceltasingola hash="ac1c288b4d794cb8ca73ae83c688e9d1">
						<prologo />
						<testo>&amp;nbsp;Scouts are:</testo>
						<risposte tipoopzioni="TESTO">
							<risposta hash="d4f43214317ea008f3f423221573f27a" tipo="TESTO">often in dangerous situations</risposta>
							<risposta hash="2e660f5e98f5f42a53c20c9688fb72a8" tipo="TESTO">sometimes in dangerous situations</risposta>
							<risposta hash="e956d7c1c83d50aa97383230743312fe" tipo="TESTO">never in dangerous situations</risposta>
						</risposte>
					</domandasceltasingola>
					<domandasceltasingola hash="5ecfecfb5ef6c1623a5cad9a41558897">
						<prologo />
						<testo>&amp;nbsp;Most of the 28 million scouts in the world are:</testo>
						<risposte tipoopzioni="TESTO">
							<risposta hash="7437a376619cfada229000031e3c4c11" tipo="TESTO">in Europe</risposta>
							<risposta hash="7d55362c34a3402ce468abf4b62e9000" tipo="TESTO">not in the west</risposta>
							<risposta hash="c44ccd703f935495440205f136e59b1f" tipo="TESTO">in the UK</risposta>
						</risposte>
					</domandasceltasingola>
				</domande>
			</domandacomprensionetesto>
		</domanda>
	</domande>


	<domande>
		<sql>SELECT domande.id, domande.specie, domande.data, "tipiDomanda".descrizione AS tipo, autori.descrizione AS autore, livelli.descrizione AS livello
FROM domande JOIN "tipiDomanda" ON domande.tipo = "tipiDomanda".id JOIN autori ON domande.autore = autori.id JOIN livelli ON domande.livello = livelli.id
WHERE domande.attiva = 1 AND domande.lingua = '1' AND domande.id NOT IN (14435, 6239) AND domande.livello = 2 AND domande.specie = 1 AND (domande.tipo = 4 OR domande.tipo = 5 OR domande.tipo = 6 OR domande.tipo = 7 OR domande.tipo = 8 OR domande.tipo = 9 OR domande.tipo = 10 OR domande.tipo = 11 OR domande.tipo = 12 OR domande.tipo = 17 OR domande.tipo = 18 OR domande.tipo = 19 OR domande.tipo = 20 OR domande.tipo = 21 OR domande.tipo = 22 OR domande.tipo = 23 OR domande.tipo = 24 OR domande.tipo = 25 OR domande.tipo = 26) AND domande.specializzazione = 1 ORDER BY rand()
 LIMIT 8</sql>
		<domanda autore="Vecchio DB" id="7032" livello="A2" peso="0.5" tag="LG_pp" tecnica="1">
			<domandasceltasingola id_vdb="162">
				<prologo>Clicca sull'opzione corretta.</prologo>
				<testo> Please, don't listen ____ him.</testo>
				<risposte>
					<risposta hash="7f7afd020c5b99be185a0027eb4b59f4" tipo="TESTO">[no word needed]</risposta>
					<risposta hash="7d0db380a5b95a8ba1da0bca241abda1" tipo="TESTO">at</risposta>
					<risposta hash="01b6e20344b68835c5ed1ddedf20d531" tipo="TESTO">to</risposta>
				</risposte>
			</domandasceltasingola>
		</domanda>
		<domanda autore="Vecchio DB" id="6881" livello="A2" peso="0.5" tag="LG_pp" tecnica="1">
			<domandasceltasingola id_vdb="11">
				<prologo>Clicca sull'opzione corretta.</prologo>
				<testo> "What's this ____ English?" "It's a book."</testo>
				<risposte>
					<risposta hash="7d0db380a5b95a8ba1da0bca241abda1" tipo="TESTO">at</risposta>
					<risposta hash="8bf8854bebe108183caeb845c7676ae4" tipo="TESTO">of</risposta>
					<risposta hash="13b5bfe96f3e2fe411c9f66f4a582adf" tipo="TESTO">in</risposta>
				</risposte>
			</domandasceltasingola>
		</domanda>
		<domanda autore="Vecchio DB" id="7017" livello="A2" peso="0.5" tag="LG_temp" tecnica="1">
			<domandasceltasingola id_vdb="147">
				<prologo>Clicca sull'opzione corretta.</prologo>
				<testo> Last night you __________________ three bottles of champagne.</testo>
				<risposte>
					<risposta hash="aba2156fe785dae028b87ec283564ca1" tipo="TESTO">drinked</risposta>
					<risposta hash="30d5285d27b5f9038e236c86a1ce5acc" tipo="TESTO">drank</risposta>
					<risposta hash="4bfda39fbefa28b9c2975eb9b4c3b8db" tipo="TESTO">drunk</risposta>
				</risposte>
			</domandasceltasingola>
		</domanda>
		<domanda autore="Vecchio DB" id="6960" livello="A2" peso="0.5" tag="LG_agg" tecnica="1">
			<domandasceltasingola id_vdb="90">
				<prologo>Clicca sull'opzione corretta.</prologo>
				<testo> How_______________ money do you have?</testo>
				<risposte>
					<risposta hash="ef56b0b0ddb93c2885892c06be830c68" tipo="TESTO">much</risposta>
					<risposta hash="8cd283d8b7bacc277f2bae5e26ce6d1e" tipo="TESTO">many</risposta>
					<risposta hash="100b8cad7cf2a56f6df78f171f97a1ec" tipo="TESTO">any</risposta>
				</risposte>
			</domandasceltasingola>
		</domanda>
		<domanda autore="Anonimo" id="2295" livello="A2" peso="0.5" tag="LG_lex" tecnica="1">
			<domandasceltasingola>
				<prologo>Clicca sull'opzione corretta.</prologo>
				<testo>He likes ____________ in the Purchasing Department.</testo>
				<risposte>
					<risposta hash="67e92c8765a9bc7fb2d335c459de9eb5" tipo="TESTO">work</risposta>
					<risposta hash="c327b49efdca2668f28cd7b4beee54b3" tipo="TESTO">working</risposta>
					<risposta hash="b3a07320af22cb5d42760f98af69c645" tipo="TESTO">to working</risposta>
				</risposte>
			</domandasceltasingola>
		</domanda>
		<domanda autore="Vecchio DB" id="6971" livello="A2" peso="0.5" tag="LG_pp" tecnica="1">
			<domandasceltasingola id_vdb="101">
				<prologo>Clicca sull'opzione corretta.</prologo>
				<testo> _____August last year I went to Greece for two weeks.</testo>
				<risposte>
					<risposta hash="efeb369cccbd560588a756610865664c" tipo="TESTO">In</risposta>
					<risposta hash="dc5f499e83aef4f6811faa4081631740" tipo="TESTO">At</risposta>
					<risposta hash="521c36a31c2762741cf0f8890cbe05e3" tipo="TESTO">On</risposta>
				</risposte>
			</domandasceltasingola>
		</domanda>
		<domanda autore="Madeleine Toal" id="11560" livello="A2" peso="0.5" tag="LG_pron" tecnica="1">
			<domandasceltasingola>
				<prologo>Clicca sull%u2019opzione corretta.</prologo>
				<testo>__________ girl is your daughter?</testo>
				<audio nrMaxRipetizioni="2" />
				<risposte tipoopzioni="TESTO">
					<risposta hash="f4505a8e033e694e6644115a5b3ab697" tipo="TESTO">Which</risposta>
					<risposta hash="124433700b3275084ede92789a9d83ef" tipo="TESTO">What</risposta>
					<risposta hash="4ee972120bcda675f75222c87cb9d356" tipo="TESTO">Who</risposta>
				</risposte>
			</domandasceltasingola>
		</domanda>
		<domanda autore="Vecchio DB" id="7373" livello="A2" peso="0.5" tag="LG_lex" tecnica="1">
			<domandasceltasingola id_vdb="503">
				<prologo>Clicca sull'opzione corretta.</prologo>
				<testo> When I lived abroad, John ____to see me every week.</testo>
				<risposte>
					<risposta hash="f5bc00ad00a9d7950a839dc920ea1c7c" tipo="TESTO">came</risposta>
					<risposta hash="dd22b70914cd2243e055d2e118741186" tipo="TESTO">went</risposta>
					<risposta hash="e680afd37e4511a8cb3ce9f63168862a" tipo="TESTO">would</risposta>
				</risposte>
			</domandasceltasingola>
		</domanda>
	</domande>


  <domande>
		<sql>SELECT domande.id, domande.specie, domande.data, "tipiDomanda".descrizione AS tipo, autori.descrizione AS autore, livelli.descrizione AS livello
FROM domande JOIN "tipiDomanda" ON domande.tipo = "tipiDomanda".id JOIN autori ON domande.autore = autori.id JOIN livelli ON domande.livello = livelli.id
WHERE domande.attiva = 1 AND domande.lingua = '1' AND domande.id NOT IN (14435, 6239, 7032, 6881, 7017, 6960, 2295, 6971, 11560, 7373, 14453) AND domande.livello = 2 AND domande.specie = 1 AND domande.tipo = 1 AND domande.specializzazione = 1 ORDER BY rand()
 LIMIT 3</sql>
		<domanda autore="Clare Darby" id="4063" livello="A2" peso="1" tag="LETTURA" tecnica="1">
			<domandasceltasingola>
				<prologo>&amp;nbsp;Clicca sull'opzione corretta.</prologo>
				<testo>Il seguente cartello indica che:</testo>
				<audio url="" />
				<immagine url="4063.jpg" />
				<risposte tipoopzioni="TESTO">
					<risposta hash="2bafb7d43fe8678f51c73fae2207c994" tipo="TESTO">You must pay to visit this church.</risposta>
					<risposta hash="568f278163905945ee59ae5dbf83347d" tipo="TESTO">The church was built recently.</risposta>
					<risposta hash="68f955f5490a28f0636b1d8f65cf9011" tipo="TESTO">You can give money to the church if you want.</risposta>
				</risposte>
			</domandasceltasingola>
		</domanda>
		<domanda autore="Carlo Anceschi" id="12101" livello="A2" peso="1" tag="LETTURA" tecnica="1">
			<domandasceltasingola>
				<prologo>Clicca sull'opzione corretta.</prologo>
				<testo>Il seguente cartello indica che:</testo>
				<immagine url="tmpOY_q-t.jpg" />
				<risposte tipoopzioni="TESTO">
					<risposta hash="fbc25fe9dc6033d599b9599ab06411d0" tipo="TESTO">You mustn't clear the machinery by moving your hands.</risposta>
					<risposta hash="7df83297b7cd184864b358cffec3966e" tipo="TESTO">Clearly you mustn't move the machinery with your hands.</risposta>
					<risposta hash="1bf49b93232d6421a204235a1e5fd99d" tipo="TESTO">You mustn't keep your hands near the moving machinery.</risposta>
				</risposte>
			</domandasceltasingola>
		</domanda>
		<domanda autore="Clare Darby" id="4066" livello="A2" peso="1" tag="LETTURA" tecnica="1">
			<domandasceltasingola>
				<prologo>&amp;nbsp;Clicca sull'opzione corretta.</prologo>
				<testo>Il seguente cartello indica che:</testo>
				<audio url="" />
				<immagine url="4066.jpg" />
				<risposte tipoopzioni="TESTO">
					<risposta hash="567a8683377f8d79bfe528b447d68944" tipo="TESTO">You can leave your shopping here.</risposta>
					<risposta hash="a4056a857638439de5398fce1e748aaf" tipo="TESTO">You can pay for your shopping later.</risposta>
					<risposta hash="34b9004a2c7468af88acb719fd0d3207" tipo="TESTO">Do not leave you shopping bags here.</risposta>
				</risposte>
			</domandasceltasingola>
		</domanda>
	</domande>
	<domande>
		<sql>SELECT domande.id, domande.specie, domande.data, "tipiDomanda".descrizione AS tipo, autori.descrizione AS autore, livelli.descrizione AS livello
FROM domande JOIN "tipiDomanda" ON domande.tipo = "tipiDomanda".id JOIN autori ON domande.autore = autori.id JOIN livelli ON domande.livello = livelli.id
WHERE domande.attiva = 1 AND domande.lingua = '1' AND domande.id NOT IN (14435, 6239, 7032, 6881, 7017, 6960, 2295, 6971, 11560, 7373, 14453, 4063, 12101, 4066) AND domande.livello = 2 AND domande.specie = 2 AND domande.tipo = 1 AND domande.specializzazione = 1 ORDER BY rand()
 LIMIT 1</sql>
		<domanda autore="Clare Darby" id="8505" livello="A2" peso="5" tag="LETTURA" tecnica="2">
			<domandacomprensionetesto>
				<prologo>&amp;nbsp;Leggi il testo e rispondi alle 5 domande cliccando sull'opzione corretta.</prologo>
				<testo_comprensione>&lt;strong&gt;An introduction to Scouting&lt;/strong&gt;&lt;br&gt;&lt;br&gt;&lt;br&gt;The Scout Association in the United Kingdom organises adventure activities and personal development opportunities for 400,000 young people aged 6-25. %u2018Personal development%u2019 means encouraging and stimulating the physical, intellectual, social and spiritual welfare of the individual. We want to help our members realise their full potential as individuals, as responsible citizens and as members of their local, national and international communities. &lt;br&gt;&lt;br&gt;It is true that we can%u2019t solve all the problems in the world but we can help to make it a better place. Scouting makes a positive contribution to society by helping young people to become independent and responsible. Young people enjoy learning by working in partnership with adults. They participate in a variety of activities and new experiences, exploring the outdoors and working in teams. &lt;br&gt;&lt;br&gt;Our method for giving young people the opportunity to learn is by offering a continuous progression of training, activities and awards that include everything that young people do in Scouting from the age of 6 to 25.&lt;br&gt;&lt;br&gt;In Scouting, our adults have a responsibility to make sure that the programmes offered are fun and exciting and guarantee that all our activities are safe and that our members are not in any way exposed to risk. &lt;br&gt;&lt;br&gt;The Scout Association is the largest co-educational youth organisation in the world. Internationally, we have over 28 million young members in 216 countries. About 65% of the international membership is in developing countries.&amp;nbsp; &lt;br&gt;&lt;br&gt;Scouting is open to all young people aged 6 to 25 of every religious and cultural background. There are also many opportunities for adults to become Leaders, Assistants or Administrators.&lt;br&gt;&lt;br&gt;&lt;br&gt;Adapted and simplified from https://members.scouts.org.uk/</testo_comprensione>
				<domande>
					<domandasceltasingola hash="088966bcd91fd0d625fc8f84b354a1d7">
						<prologo />
						<testo>&amp;nbsp;Under half a million people in the UK:</testo>
						<risposte tipoopzioni="TESTO">
							<risposta hash="e1ec1db459550f92240d325bedf03467" tipo="TESTO">are adolescents</risposta>
							<risposta hash="775f6e62b85a1b5bfe1daf2937e5fa52" tipo="TESTO">are scouts</risposta>
							<risposta hash="0880a95600cff13ee2a1094d7e67eed1" tipo="TESTO">organize scout activities</risposta>
						</risposte>
					</domandasceltasingola>
					<domandasceltasingola hash="c35cea01b134c6bdab01b8f0d84cdb35">
						<prologo />
						<testo>&amp;nbsp;Scouts are encouraged:&lt;br&gt;</testo>
						<risposte tipoopzioni="TESTO">
							<risposta hash="98cac2204c2a322deb68436be4720780" tipo="TESTO">to solve all the problems in the world</risposta>
							<risposta hash="451f17019d806004d2ff525017c97d8a" tipo="TESTO">to depend on adults</risposta>
							<risposta hash="cb28fda82f5d43c9e32786855924dba7" tipo="TESTO">to be autonomous</risposta>
						</risposte>
					</domandasceltasingola>
					<domandasceltasingola hash="43de205949bae71c565840b41cf0d0a6">
						<prologo />
						<testo>&amp;nbsp;Scouts are gradually given:</testo>
						<risposte tipoopzioni="TESTO">
							<risposta hash="874e24a0cd81b13065295c65481ad18e" tipo="TESTO">more dangerous activities</risposta>
							<risposta hash="8015883e2727b5bf5ed0d1c073dccf79" tipo="TESTO">prizes for learning</risposta>
							<risposta hash="7ffdcf54546b75520b930e5353c71f42" tipo="TESTO">more teamwork</risposta>
						</risposte>
					</domandasceltasingola>
					<domandasceltasingola hash="ac1c288b4d794cb8ca73ae83c688e9d1">
						<prologo />
						<testo>&amp;nbsp;Scouts are:</testo>
						<risposte tipoopzioni="TESTO">
							<risposta hash="d4f43214317ea008f3f423221573f27a" tipo="TESTO">often in dangerous situations</risposta>
							<risposta hash="2e660f5e98f5f42a53c20c9688fb72a8" tipo="TESTO">sometimes in dangerous situations</risposta>
							<risposta hash="e956d7c1c83d50aa97383230743312fe" tipo="TESTO">never in dangerous situations</risposta>
						</risposte>
					</domandasceltasingola>
					<domandasceltasingola hash="5ecfecfb5ef6c1623a5cad9a41558897">
						<prologo />
						<testo>&amp;nbsp;Most of the 28 million scouts in the world are:</testo>
						<risposte tipoopzioni="TESTO">
							<risposta hash="7437a376619cfada229000031e3c4c11" tipo="TESTO">in Europe</risposta>
							<risposta hash="7d55362c34a3402ce468abf4b62e9000" tipo="TESTO">not in the west</risposta>
							<risposta hash="c44ccd703f935495440205f136e59b1f" tipo="TESTO">in the UK</risposta>
						</risposte>
					</domandasceltasingola>
				</domande>
			</domandacomprensionetesto>
		</domanda>
	</domande>
</insiemi_domande>
`;

const script = `
<test descrizione="placement test ITA L2_da febbraio 2017" id="841" idUser="2" serverTime="2024-07-12T15:21:01.305928" sessionId="422" signed_userId="16404">
	<prologo autore="Alessandra Marazzi" corso_di_laurea="placement test ITALIANO Erasmus" data_revisione="2017-02-16" lingua="5"/>
	<stazioni>
		<stazione ID="liv_A1" countdown="30" iniziale="true" numero_ordine="1">
			<insieme_domande>
				<domande id="13169" peso_unitario="2" quantita="1"/>
				<domande id="13156" peso_unitario="2" quantita="1"/>
				<domande id="12959" peso_unitario="2" quantita="1"/>
				<domande id="12943" peso_unitario="2" quantita="1"/>
				<domande id="12942" peso_unitario="2" quantita="1"/>
				<domande id="13176" peso_unitario="2" quantita="1"/>
				<domande id="13163" peso_unitario="2" quantita="1"/>
				<domande id="12969" peso_unitario="2" quantita="1"/>
				<domande id="12967" peso_unitario="2" quantita="1"/>
				<domande id="12054" peso_unitario="5" quantita="1"/>
				<domande id="12060" peso_unitario="5" quantita="1"/>
			</insieme_domande>
			<caso condizione="lt16.5">
				<azione stato_acquisito="NL" vai_a="uscita"/>
			</caso>
			<caso condizione="ge16.5,le19.5">
				<azione stato_acquisito="A2 da confermare" vai_a="uscita"/>
			</caso>
			<altrimenti>
				<azione stato_acquisito="A1" vai_a="liv_A2"/>
			</altrimenti>
		</stazione>
		<stazione ID="liv_A2" countdown="40" iniziale="false" numero_ordine="2">
			<insieme_domande>
				<domande livello="2" peso_unitario="1" quantita="2" specializzazione="1" tag="4, 5, 6, 7, 8, 9, 10, 11, 12, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26" tecnica="7"/>
				<domande livello="2" peso_unitario="0.5" quantita="12" specializzazione="1" tag="4, 5, 6, 7, 8, 9, 10, 11, 12, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26" tecnica="1"/>
				<domande livello="2" peso_unitario="1" quantita="10" specializzazione="1" tag="17, 21, 23" tecnica="12"/>
				<domande livello="2" peso_unitario="1" quantita="1" specializzazione="1" tag="28" tecnica="5"/>
				<domande livello="2" peso_unitario="1" quantita="1" specializzazione="1" tag="26" tecnica="5"/>
				<domande livello="2" peso_unitario="5" quantita="1" specializzazione="1" tag="1" tecnica="2"/>
			</insieme_domande>
			<caso condizione="lt17.5">
				<azione stato_acquisito="corso A2" vai_a="uscita"/>
			</caso>
			<altrimenti>
				<azione stato_acquisito="A2" vai_a="liv_B1"/>
			</altrimenti>
		</stazione>
		<stazione ID="liv_B1" countdown="40" iniziale="false" numero_ordine="3">
			<insieme_domande>
				<domande livello="3" peso_unitario="1" quantita="3" specializzazione="1" tag="4, 5, 6, 7, 8, 9, 10, 11, 12, 17, 18, 19, 20, 21, 22, 23, 24, 25" tecnica="5"/>
				<domande livello="3" peso_unitario="0.5" quantita="6" specializzazione="1" tag="4, 5, 6, 7, 8, 9, 10, 11, 12, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26" tecnica="1"/>
				<domande livello="3" peso_unitario="1" quantita="6" specializzazione="1" tag="17, 21, 23" tecnica="12"/>
				<domande livello="3" peso_unitario="3" quantita="1" specializzazione="1" tag="1" tecnica="6"/>
				<domande livello="3" peso_unitario="5" quantita="1" specializzazione="1" tag="2" tecnica="2"/>
				<domande livello="3" peso_unitario="5" quantita="1" specializzazione="1" tag="1" tecnica="2"/>
			</insieme_domande>
			<caso condizione="lt17.5">
				<azione stato_acquisito="corso B1" vai_a="uscita"/>
			</caso>
			<altrimenti>
				<azione stato_acquisito="B1" vai_a="liv_B2"/>
			</altrimenti>
		</stazione>
		<stazione ID="liv_B2" countdown="40" iniziale="false" numero_ordine="4">
			<insieme_domande>
				<domande livello="4" peso_unitario="1" quantita="3" specializzazione="1" tag="4, 5, 6, 7, 8, 9, 10, 11, 12, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26" tecnica="5"/>
				<domande livello="4" peso_unitario="1" quantita="6" specializzazione="1" tag="17, 21, 23" tecnica="12"/>
				<domande livello="4" peso_unitario="0.5" quantita="6" specializzazione="1" tag="4, 5, 6, 7, 8, 9, 10, 11, 12, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26" tecnica="1"/>
				<domande livello="4" peso_unitario="3" quantita="1" specializzazione="1" tag="1" tecnica="6"/>
				<domande livello="4" peso_unitario="5" quantita="1" specializzazione="1" tag="2" tecnica="2"/>
				<domande livello="4" peso_unitario="5" quantita="1" specializzazione="1" tag="1" tecnica="2"/>
			</insieme_domande>
			<caso condizione="lt17.5">
				<azione stato_acquisito="corso B2" vai_a="uscita"/>
			</caso>
			<altrimenti>
				<azione stato_acquisito="corso C1" vai_a="uscita"/>
			</altrimenti>
		</stazione>
	</stazioni>
	<studente cognome="Marazzi" nome="Alessandra"/>
</test>
`;

export default {
  domande,
  script,
};
