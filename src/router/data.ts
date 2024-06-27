const script = `
<insiemi_domande>
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
export default {
  script,
};
