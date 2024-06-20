const DomandaSceltaSingola = `
<domandasceltasingola id_vdb="162">
				<prologo>Clicca sull'opzione corretta.</prologo>
				<testo> Please, don't listen ____ him.</testo>
				<risposte>
					<risposta hash="7f7afd020c5b99be185a0027eb4b59f4" tipo="TESTO">[no word needed]</risposta>
					<risposta hash="7d0db380a5b95a8ba1da0bca241abda1" tipo="TESTO">at</risposta>
					<risposta hash="01b6e20344b68835c5ed1ddedf20d531" tipo="TESTO">to</risposta>
				</risposte>
</domandasceltasingola>
`;

const DomandaRiordino = `
<domandariordino> 	 <prologo>&lt;p&gt;&lt;b&gt;Ordena el texto trasladando los párrafos con el ratón. El primero ya está colocado.&lt;/b&gt;&lt;br&gt;&lt;/p&gt;</prologo> 	 <testo>El cambio climático aumenta hasta en un 50% la probabilidad de guerras&lt;br&gt;</testo>
<risposte>
  <risposta ordine="1">Las variaciones extremas en las lluvias del África Sahariana provocadas por el cambio climático incrementan hasta un 50% la probabilidad de que haya una guerra, alertó hoy el vicerrector académico de la Universidad Iberoamericana, Alejandro Guevara.</risposta>
  <risposta ordine="2">Las sequías influyen en que haya menos cosechas y, por tanto, menos alimentos, lo que provocauna "lucha por la tierra donde sí se puede sembrar", senaló Guevara al presentar la investigación "Cambio climático, desastres naturales y sus efectos macroeconómicos".</risposta>
  <risposta ordine="3">El experto en economía relativa al medioambiente alertó de que el número de desastres naturales ha aumentado de manera alarmante en las últimas décadas. Por ello, pidió medidas para prevenir las pérdidas humanas y económicas derivadas de catástrofes ambientales, como las inundaciones o sequías.</risposta>
  <risposta ordine="4">Destacó que la mayor parte de la evidencia empírica apunta a que los desastres naturales sí merman la capacidad de crecimiento de un país. "Los desastres naturales provocan una disminución mayor del índice del desarrollo humano en los municipios menos desarrollados", indicó.</risposta>
  <risposta ordine="5">Esto se traduce en una "desigualidad social", puesto que los desastres naturales impactan con más fuerza e los grupos más vulnerables. "Las afectaciones por un mismo desastre son relativamente mucho mayores" en aquellos países donde la gente es más pobre.</risposta>
</risposte>
</domandariordino>
`;

const DomandaSceltaMultipla = `
<domandasceltamultipla maxrisposte="2">
<prologo>&lt;p&gt;&lt;span style="font-size: 14px;"&gt;Choose the correct letter &lt;/span&gt;&lt;b&gt;&lt;span style="font-size: 14px;"&gt;A&lt;/span&gt;&lt;/b&gt;&lt;span style="font-size: 14px;"&gt;,&lt;/span&gt;&lt;b&gt;&lt;span style="font-size: 14px;"&gt; B&lt;/span&gt;&lt;/b&gt;&lt;span style="font-size: 14px;"&gt; or &lt;/span&gt;&lt;b&gt;&lt;span style="font-size: 14px;"&gt;C&lt;/span&gt;&lt;/b&gt;&lt;span style="font-size: 14px;"&gt;.&lt;/span&gt;&lt;br&gt;&lt;/p&gt;</prologo> 	    <testo>&lt;b&gt;&lt;span style="font-size: 18px;"&gt;6. What do Henry Moore and Barbara Hepworth have in common?&lt;/span&gt;&lt;/b&gt;&lt;br&gt;</testo>
<risposte>
  <risposta corretta="1">A. They studied in the same place.</risposta>
  <risposta corretta="0">B. They both create works of art inspired by nature. </risposta>
  <risposta corretta="0">C. Their works were made to be shown in the Yorkshire countryside.</risposta>
  <risposta corretta="0">C. Their works were made to be shown in the Yorkshire countryside.</risposta>
  <risposta corretta="0">C. Their works were made to be shown in the Yorkshire countryside.</risposta>
</risposte> 	<immagine url="tmpyja8xdkb.15875.png"></immagine>
</domandasceltamultipla>
`;

const DomandaComprensioneTesto = `
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
`;

const DomandaScritturaLibera = `
<domandascritturalibera> 	<prologo>&lt;b&gt;Choose one of the topics and write your essay in at least 250 words in an appropriate style.&lt;/b&gt;&lt;br&gt;</prologo> 	<testo>&lt;p&gt;&lt;b&gt;1.&lt;/b&gt; If you could change something about the education system in your country
 (primary, secondary, or university - your choice), what would it be?
Please remember to support your opinion. &lt;br&gt;&lt;br&gt;&lt;b&gt;2.&lt;/b&gt; Some say there should
be a test of basic skills or knowledge in order to register to vote (in
national elections). Do you agree or disagree? Please remember to
support your opinion. &lt;br&gt;&lt;br&gt;&lt;b&gt;3.&lt;/b&gt; The current concern for climate change has
 led to many proposed solutions, including a government tax on fuel to
discourage people from driving private cars. What is your opinion of
this proposition? Please remember to support your opinion.&lt;br&gt;&lt;/p&gt;</testo> 	</domandascritturalibera>
`;

const DomandaRiempimentoTesto = `
			<domandariempimentotesto>
				<prologo>&amp;nbsp;Trascina l'opzione corretta in ogni spazio.</prologo>
				<testo>OBESITY IN MEXICO&lt;br&gt;&lt;br&gt;Mexico is a country with the second highest rate of obesity. The government says that around 37 million Mexicans are obese.&lt;br&gt;&lt;br&gt;The government wants to help these obese people %u2013 it ___1___ 30 health stations in 21 Metrobus stations in Mexico City. When somebody ___2___ in front of the station, it tells the person to do 10 squats. While you exercise, the station ___3___ you some advice on how to live a healthy life. When you%u2019re finished with the squats, the station gives you a free ticket!&lt;br&gt;&lt;br&gt;Experts ___4___ that so many people in Mexico are obese because of unhealthy food and drinks.</testo>
				<risposte>
					<risposta hash="74c6abe13f6fc1bafd3575a8d055c56d">helps</risposta>
					<risposta hash="84eeb81e61c76ad3f4103b0b051c7021">says</risposta>
					<risposta hash="a53ff64efd169c1b4d085d6e7075c8d7">say</risposta>
					<risposta hash="8e13ffc9fd9d6a6761231a764bdf106b">put</risposta>
					<risposta hash="0a7cbd25cb6eac751b588dd3b21059e9">walks</risposta>
					<risposta hash="3674478d09da161a0fa409f7c30380ee">gives</risposta>
				</risposte>
			</domandariempimentotesto>
`;

const DomandaRiempimentoTestoLibero = `
<domandariempimentotestolibero> 	<prologo>&lt;p&gt;&lt;span style="font-size: 14px;"&gt;&lt;b&gt;Read the passage below.&lt;/b&gt;&lt;br&gt;&lt;/span&gt;&lt;/p&gt;</prologo> 	<testo>&lt;p&gt;&lt;b&gt;&lt;span style="font-size: 14px;"&gt;Two studies reveal benefits of mindfulness for middle school students&lt;/span&gt;&lt;br&gt;&lt;span style="font-size: 14px;"&gt;Focusing awareness on the present moment can enhance academic performance and lower stress levels.&lt;/span&gt;&lt;/b&gt;&lt;/p&gt;&lt;p&gt;&lt;span style="font-family:&amp;quot;Open Sans&amp;quot;,sans-serif"&gt;&lt;span style="font-size: 14px;"&gt;A&lt;/span&gt;&lt;br&gt;&lt;span style="font-size: 14px;"&gt;
Two new studies from MIT suggest that mindfulness, the practice of focusing
one's awareness on the present moment, can enhance academic performance and
mental health in middle schoolers. The researchers found that more mindfulness
correlates with better academic performance, fewer suspensions from school, and
less stress.&lt;/span&gt;&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style="font-family:&amp;quot;Open Sans&amp;quot;,sans-serif"&gt;&lt;span style="font-size: 14px;"&gt;B&lt;/span&gt;&lt;br&gt;&lt;span style="font-size: 14px;"&gt;
'By definition, mindfulness is the ability to focus attention on the present
moment, as opposed to being distracted by external things or internal thoughts.
If you're focused on the teacher in front of you, or the homework in front of
you, that should be good for learning,' says John Gabrieli, the Grover M.
Hermann Professor in Health Sciences and Technology, a professor of brain and
cognitive sciences, and a member of MIT's McGovern Institute for Brain
Research. The researchers also showed, for the first time, that mindfulness
training can alter brain activity in students. Sixth-graders who received
mindfulness training not only reported feeling less stressed, but their brain
scans revealed reduced activation of the amygdala, a brain region that
processes fear and other emotions, when they viewed images of fearful faces.&lt;/span&gt;&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style="font-family:&amp;quot;Open Sans&amp;quot;,sans-serif"&gt;&lt;span style="font-size: 14px;"&gt;C&lt;/span&gt;&lt;br&gt;&lt;span style="font-size: 14px;"&gt;
Together, the findings suggest that offering mindfulness training in schools
could benefit many students, says Gabrieli, who is the senior author of both
studies. 'We think there is a reasonable possibility that mindfulness
training would be beneficial for children as part of the daily curriculum in
their classroom,' he says. "What's also appealing about mindfulness is that there
are pretty well-established ways of teaching it."&lt;/span&gt;&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;&lt;span style="font-family: &amp;quot;Open Sans&amp;quot;, sans-serif; font-size: 14px;"&gt;In the moment&lt;/span&gt;&lt;/strong&gt;&lt;span style="font-family:&amp;quot;Open Sans&amp;quot;,sans-serif"&gt;&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style="font-family:&amp;quot;Open Sans&amp;quot;,sans-serif"&gt;&lt;span style="font-size: 14px;"&gt;D&lt;/span&gt;&lt;br&gt;&lt;span style="font-size: 14px;"&gt;
Both studies were performed at charter schools in Boston. In one of the papers,
which appears today in the journal &lt;/span&gt;&lt;em&gt;&lt;span style="font-family: &amp;quot;Open Sans&amp;quot;, sans-serif; font-size: 14px;"&gt;Behavioral
Neuroscience&lt;/span&gt;&lt;/em&gt;&lt;span style="font-size: 14px;"&gt;, the MIT team studied about 100 sixth-graders. Half of
the students received mindfulness training every day for eight weeks, while the
other half took a coding class. The mindfulness exercises were designed to
encourage students to pay attention to their breath, and to focus on the
present moment rather than thoughts of the past or the future.&lt;/span&gt;&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style="font-family:&amp;quot;Open Sans&amp;quot;,sans-serif"&gt;&lt;span style="font-size: 14px;"&gt;E&lt;/span&gt;&lt;br&gt;&lt;span style="font-size: 14px;"&gt;
Students who received the mindfulness training reported that their stress
levels went down after the training, while the students in the control group
did not. Students in the mindfulness training group also reported fewer
negative feelings, such as sadness or anger, after the training. About 40 of
the students also participated in brain imaging studies before and after the
training. The researchers measured activity in the amygdala as the students
looked at pictures of faces expressing different emotions. At the beginning of
the study, before any training, students who reported higher stress levels
showed more amygdala activity when they saw fearful faces. This is consistent
with previous research showing that the amygdala can be overactive in people
who experience more stress, leading them to have stronger negative reactions to
adverse events. 'There's a lot of evidence that an overly strong amygdala
response to negative things is associated with high stress in early childhood
and risk for depression,' Gabrieli says.&lt;/span&gt;&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style="font-family:&amp;quot;Open Sans&amp;quot;,sans-serif"&gt;&lt;span style="font-size: 14px;"&gt;F&lt;/span&gt;&lt;br&gt;&lt;span style="font-size: 14px;"&gt;
After the mindfulness training, students showed a smaller amygdala response
when they saw the fearful faces, consistent with their reports that they felt
less stressed. This suggests that mindfulness training could potentially help
prevent or mitigate mood disorders linked with higher stress levels, the
researchers say. Richard Davidson, a professor of psychology and psychiatry at
the University of Wisconsin, says that the findings suggest there could be
great benefit to implementing mindfulness training in middle schools. 'This is
really one of the very first rigorous studies with children of that age to
demonstrate behavioral and neural benefits of a simple mindfulness training,'
says Davidson, who was not involved in the study.&lt;/span&gt;&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;strong&gt;&lt;span style="font-family: &amp;quot;Open Sans&amp;quot;, sans-serif; font-size: 14px;"&gt;Evaluating
mindfulness&lt;/span&gt;&lt;/strong&gt;&lt;span style="font-family:&amp;quot;Open Sans&amp;quot;,sans-serif"&gt;&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style="font-family:&amp;quot;Open Sans&amp;quot;,sans-serif"&gt;&lt;span style="font-size: 14px;"&gt;G&lt;/span&gt;&lt;br&gt;&lt;span style="font-size: 14px;"&gt;
In the other paper, which appeared in the journal &lt;/span&gt;&lt;em&gt;&lt;span style="font-family: &amp;quot;Open Sans&amp;quot;, sans-serif; font-size: 14px;"&gt;Mind, Brain, and Education&lt;/span&gt;&lt;/em&gt;&lt;span style="font-size: 14px;"&gt; in June, the
researchers did not perform any mindfulness training but used a questionnaire
to evaluate mindfulness in more than 2,000 students in grades 5-8. The
questionnaire was based on the Mindfulness Attention Awareness Scale, which is
often used in mindfulness studies on adults. Participants are asked to rate how
strongly they agree with statements such as 'I rush through activities without
being really attentive to them.' The researchers compared the questionnaire
results with students' grades, their scores on statewide standardized tests,
their attendance rates, and the number of times they had been suspended from
school. Students who showed more mindfulness tended to have better grades and
test scores, as well as fewer absences and suspensions. 'People had not asked
that question in any quantitative sense at all, as to whether a more mindful
child is more likely to fare better in school,' Gabrieli says. 'This is the
first paper that says there is a relationship between the two.'&lt;/span&gt;&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style="font-family:&amp;quot;Open Sans&amp;quot;,sans-serif"&gt;&lt;span style="font-size: 14px;"&gt;H&lt;/span&gt;&lt;br&gt;&lt;span style="font-size: 14px;"&gt;
The researchers now plan to do a full school-year study, with a larger group of
students across many schools, to examine the longer-term effects of mindfulness
training. Shorter programs like the two-month training used in the &lt;/span&gt;&lt;em&gt;&lt;span style="font-family: &amp;quot;Open Sans&amp;quot;, sans-serif; font-size: 14px;"&gt;Behavioral Neuroscience&lt;/span&gt;&lt;/em&gt;&lt;span style="font-size: 14px;"&gt;
study would most likely not have a lasting impact, Gabrieli says. 'Mindfulness
is like going to the gym. If you go for a month, that's good, but if you stop
going, the effects won't last,' he says. 'It's a form of mental exercise that
needs to be sustained.'&lt;/span&gt;&lt;/span&gt;&lt;/p&gt;&lt;p class="MsoNormal"&gt;&lt;span style="font-size:10.0pt;line-height:107%"&gt;http://news.mit.edu/2019/mindfulness-mental-health-benefits-students-0826&lt;/span&gt;&lt;/p&gt;&lt;p class="MsoNormal"&gt;&lt;span style="font-size: 14px;"&gt;Glossary&lt;/span&gt;&lt;/p&gt;&lt;p class="MsoNormal"&gt;&lt;span style="font-size: 14px;"&gt;charter school: (in North America) a publicly funded
independent school established by teachers, parents, or community groups under
the terms of a charter with a local or national authority.&lt;/span&gt;&lt;/p&gt;&lt;p class="MsoNormal"&gt;&lt;span style="font-size: 14px;"&gt;&lt;br&gt;&lt;/span&gt;&lt;/p&gt;&lt;p class="MsoNormal"&gt;&lt;b&gt;&lt;span style="font-size: 14px;"&gt;1. The reading passage has eight paragraphs, A-H. &lt;/span&gt;&lt;span style="font-size: 14px;"&gt;Which paragraphs contain the following information? &lt;/span&gt;&lt;span style="font-size: 14px;"&gt;You may use any letter more than once.&lt;/span&gt;&lt;span style="font-size: 14px;"&gt; &lt;/span&gt;&lt;span style="font-size: 14px;"&gt;&lt;/span&gt;&lt;span style="font-size: 14px;"&gt;&lt;/span&gt;&lt;span style="font-size: 14px;"&gt;Add the correct letter, A-H.&lt;/span&gt;&lt;/b&gt;&lt;span style="font-size: 14px;"&gt;&lt;br&gt;&lt;/span&gt;&lt;span style="font-size: 14px;"&gt;&lt;br&gt;&lt;/span&gt;&lt;/p&gt;&lt;p class="MsoNormal"&gt;&lt;span style="font-size: 14px;"&gt;how long the benefits of mindfulness training last&amp;nbsp; ___1___&lt;/span&gt;&lt;/p&gt;&lt;p class="MsoNormal"&gt;&lt;span style="font-size: 14px;"&gt;the impact of levels of mindfulness on school attendance&amp;nbsp; ___2___&lt;/span&gt;&lt;/p&gt;&lt;p class="MsoNormal"&gt;&lt;span style="font-size: 14px;"&gt;the effect of programming classes on stress levels&amp;nbsp; ___3___&lt;/span&gt;&lt;/p&gt;&lt;p class="MsoNormal"&gt;&lt;span style="font-size: 14px;"&gt;the duration of the follow-up investigation ___4___&lt;/span&gt;&lt;/p&gt;&lt;p class="MsoNormal"&gt;&lt;span style="font-size: 14px;"&gt;the number of participants who took part in brain studies ___5___&lt;/span&gt;&lt;br&gt;&lt;/p&gt;&lt;p&gt;

&lt;/p&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;&lt;p&gt;&lt;b&gt;&lt;span style="font-size: 14px;"&gt;2. Do the following statements agree with the information given in the reading passage?&lt;/span&gt;&lt;/b&gt;&lt;br&gt;&lt;span style="font-size: 14px;"&gt;Add&lt;/span&gt;&lt;br&gt;&lt;span style="font-size: 14px;"&gt;&lt;b&gt;True &lt;/b&gt;if the statement agrees with the information&lt;/span&gt;&lt;br&gt;&lt;span style="font-size: 14px;"&gt;&lt;b&gt;False&lt;/b&gt; if the statement contradicts the information&lt;/span&gt;&lt;br&gt;&lt;span style="font-size: 14px;"&gt;&lt;b&gt;Not given&lt;/b&gt; if there is no information on this&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style="font-size: 14px;"&gt;Research shows the ability to concentrate on the task at hand results in better exam grades.&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style="font-size: 14px;"&gt;___6___&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style="font-size: 14px;"&gt;There is a body of good practice indicating how to teach mindfulness.&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style="font-size: 14px;"&gt;___7___&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style="font-size: 14px;"&gt;Students who took the programming course experienced more negative emotions afterwards than those that followed the mindfulness training.&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style="font-size: 14px;"&gt;___8___&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style="font-size: 14px;"&gt;Researchers detected a positive influence on brain functionality from the practice of mindfulness.&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style="font-size: 14px;"&gt;___9___&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style="font-size: 14px;"&gt;Some students apply mindfulness techniques without receiving training.&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style="font-size: 14px;"&gt;___10___&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style="font-size: 14px;"&gt;&lt;br&gt;&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;b&gt;&lt;span style="font-size: 14px;"&gt;3. Complete the notes below.&lt;/span&gt;&lt;/b&gt;&lt;/p&gt;&lt;p&gt;&lt;span style="font-size: 14px;"&gt;Add &lt;b&gt;ONE WORD OR A NUMBER&lt;/b&gt; from the passage.&lt;/span&gt;&lt;/p&gt;&lt;p&gt;&lt;span style="font-size: 14px;"&gt;&lt;b&gt;Do some students already practice mindfulness? The latest research.&lt;br&gt;&lt;/b&gt;&lt;/span&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;&lt;span style="font-size: 14px;"&gt;over ___11__ participants&lt;/span&gt;&lt;/li&gt;&lt;/ul&gt;&lt;p&gt;&lt;span style="font-size: 14px;"&gt;&lt;br&gt;&lt;/span&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;&lt;span style="font-size: 14px;"&gt;responded to questions used to assess levels of mindfulness in adults&lt;/span&gt;&lt;/li&gt;&lt;/ul&gt;&lt;p&gt;&lt;span style="font-size: 14px;"&gt;&lt;br&gt;&lt;/span&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;&lt;span style="font-size: 14px;"&gt;students asked the extent to which their views concurred with a list of ___12___ about mindfulness&lt;/span&gt;&lt;/li&gt;&lt;/ul&gt;&lt;p&gt;&lt;span style="font-size: 14px;"&gt;&lt;br&gt;&lt;/span&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;&lt;span style="font-size: 14px;"&gt;participants demonstrating mindfulness receive fewer ___13___&lt;/span&gt;&lt;/li&gt;&lt;/ul&gt;&lt;p&gt;&lt;span style="font-size: 14px;"&gt;&lt;br&gt;&lt;/span&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;&lt;span style="font-size: 14px;"&gt;only study that indicates a ___14___ between mindfulness and performance in school&lt;/span&gt;&lt;span style="font-size: 14px;"&gt;&lt;/span&gt;&lt;span style="font-size: 14px;"&gt;&lt;/span&gt;&lt;br&gt;&lt;span style="font-size: 14px;"&gt;&lt;/span&gt;&lt;/li&gt;&lt;/ul&gt;&lt;p&gt;&lt;br&gt;&lt;/p&gt;</testo> 	<risposte case_sensitive="NO">
<risposta ordine="1">H</risposta>
<risposta ordine="2">G</risposta>
<risposta ordine="3">E</risposta>
<risposta ordine="4">H</risposta>
<risposta ordine="5">E</risposta>
<risposta ordine="6">True</risposta>
<risposta ordine="7">True</risposta>
<risposta ordine="8">Not given</risposta>
<risposta ordine="9">True</risposta>
<risposta ordine="10">True</risposta>
<risposta ordine="11">2,000</risposta>
<risposta ordine="12">statements</risposta>
<risposta ordine="13">suspensions</risposta>
<risposta ordine="14">relationship</risposta>
</risposte> 	</domandariempimentotestolibero>

`;

const DomandaRiempimentoLibero = `
<domandaRiempimentoLibero>
  <prologo>&lt;strong&gt;Part 3&lt;/strong&gt;.&lt;br&gt;You will hear a teacher talking about using stories in the primary classroom for teaching English. For each question, fill in the missing information in the provided space. You now have 60 seconds to look at part 3.</prologo>
  <testo>&lt;strong&gt;Why use stories?&lt;/strong&gt;&lt;br&gt;&lt;ul&gt;&lt;li&gt;Children love them.&lt;/li&gt;&lt;li&gt;They always want to know what happens ________1____________&lt;/li&gt;&lt;li&gt;Research has shown that pupils concentrate more on _________2___________ than on the language used&lt;/li&gt;&lt;li&gt;It improves __________3__________ skills&lt;/li&gt;&lt;/ul&gt;&lt;br&gt;&lt;br&gt;&lt;strong&gt;And how does the teacher actually tell the story?&lt;/strong&gt;&lt;br&gt;&lt;br&gt;The teacher must:&lt;br&gt;&lt;ul&gt;&lt;li&gt;identify and present key _________4___________&lt;/li&gt;&lt;li&gt;introduce the story slowly&lt;/li&gt;&lt;li&gt;know the story well&lt;/li&gt;&lt;li&gt;speak slowly but naturally&lt;/li&gt;&lt;li&gt;use mime, gestures and __________5__________&lt;/li&gt;&lt;li&gt;ask pupils questions to involve them&lt;/li&gt;&lt;/ul&gt;&lt;br&gt;&lt;br&gt;&lt;strong&gt;How can the stories be followed up?&lt;/strong&gt;&lt;br&gt;&lt;br&gt;&lt;ul&gt;&lt;li&gt;Pupils draw or label a picture&lt;/li&gt;&lt;li&gt;Do a __________6__________ telling students which colours to use&lt;/li&gt;&lt;li&gt;Put up a _________7___________ on the wall with the story&lt;/li&gt;&lt;/ul&gt;</testo>
  <audio url="tmpFYSEW4.ogg"/>
</domandaRiempimentoLibero>

`;

const DomandaOutputStudente = `
<domandaoutputstudente>
  <prologo>Write the only correct word that fills in all the gaps in the bottom box.</prologo>
  <testo>&amp;nbsp;worry at all. Well the doctor said he%u2019s going to _____&amp;nbsp; in on you on the way in tomorrow Richard%u2019s a dear old friend.&lt;br&gt;sorry she said. Well why don't you _____&amp;nbsp; where you're going instead of walking around with your head in the clouds&lt;br&gt;embarrassed everytime I have to walk past them. They always have to _____ me up and down and whistle, making me &lt;br&gt;the Haidian district. The authorities promised to _____&amp;nbsp; into the complaints in order to defuse the situation&lt;br&gt;end of a disastrous season. You should have seen the _____&amp;nbsp; of despair&amp;nbsp; when Manchester United won the match&lt;br&gt;interesting periods of my life. When I _____ back it's always with great warmth and affection. I particularly recall the &lt;br&gt;We must be constantly vigil and keep a sharp _____&amp;nbsp; out for new issues which need to be put on our agenda&lt;br&gt;clothes you wear to go to church on Sunday. You must _____ your best at the interview as you'll also be judged &lt;br&gt;the economic crisis. Some people believe things are really beginning to _____ up again at last. Optimism is the &lt;br&gt;just because I chatted to her boyfriend at the party. She gave me a really dirty _____&amp;nbsp; on the bus on the way to &lt;br&gt;</testo>
  <risposte tipoCheck="AUTOMATICO">
    <risposta>look</risposta>
  </risposte>
</domandaoutputstudente>
`;

const DomandaAbbinamentoMultiplo = `
<domandaabbinamentomultiplo>
  <prologo>Abbina TUTTE le 8 opzioni ai testi corrispondenti trascinandole con il mouse.</prologo>
  <testo>people who still believe in&amp;nbsp; writing letters</testo>
  <coppie tipoopzioni="TESTO" tipoorientamento="ORIZZONTALE">
    <coppia>
      <fissa>Mary Harney, the politician has headed notepaper provided for her by the Parliament.
She has no interest in writing letters herself even though she must reply
by letter to her constituents queries. She dictates her letters into a dictaphone so that her secretary can write or type them up them for her and then she signs her signature at the bottom .
She has no time for the old-fashioned handwritten letter she confesses. She is a lover of gadgets that are time-savers because her life is so busy, and the computer is just  that she says.
</fissa>
      <mobile>This person is expected to write letters as part of her job</mobile>
    </coppia>

    <coppia>
      <fissa>Mary Harney, the politician has headed notepaper provided for her by the Parliament.
She has no interest in writing letters herself even though she must reply
by letter to her constituents queries. She dictates her letters into a dictaphone so that her secretary can write or type them up them for her and then she signs her signature at the bottom .
She has no time for the old-fashioned handwritten letter she confesses. She is a lover of gadgets that are time-savers because her life is so busy, and the computer is just  that she says.
</fissa>
      <mobile>This person has help with the letters he/she has to write.</mobile>
    </coppia>

    <coppia>
      <fissa>Pete Brown who loves receiving and sending letters, confesses that he finds
letter writing really difficult 'I never seem to get the time these days.'
He keeps a cardboard box of them in the attic, so that he can reread them in his old age.
'I choose my notepaper with care. I love wandering around stationery shops and feeling the
quality of the paper and the envelopes must match the writing paper!'</fissa>
      <mobile>This person takes care of the appearance ot their letters.</mobile>
    </coppia>

    <coppia>
      <fissa>Pete Brown who loves receiving and sending letters, confesses that he finds
letter writing really difficult 'I never seem to get the time these days.'
He keeps a cardboard box of them in the attic, so that he can reread them in his old age.
'I choose my notepaper with care. I love wandering around stationery shops and feeling the
quality of the paper and the envelopes must match the writing paper!'</fissa>
      <mobile>This person has made a point of keeping letters.</mobile>

    </coppia>
    <coppia>
      <fissa>Jane Stevens is the 'agony aunt' for a top weekly magazine. Her problem page attracts hundreds of hand-written letters.
Each week she writes a personal reply to all she receives even if her boss does not require her to do so.Her magazine prefers
 email for the answers to the letters not included in the weekly printed page of the magazine, but Jane will have none of that.She thinks that the handwriting is often a real clue to the
personality and sincerity of the writer. I can't stand email', she says 'they're so cold and concise, I can't send someone back advice to a heartfelt difficulty in an email'! </fissa>
      <mobile>This person feels that electronic aids make letter writing less personal.</mobile>
    </coppia>

    <coppia>
      <fissa>Jane Stevens is the 'agony aunt' for a top weekly magazine. Her problem page attracts hundreds of hand-written letters.
Each week she writes a personal reply to all she receives even if her boss does not require her to do so.Her magazine prefers
 email for the answers to the letters not included in the weekly printed page of the magazine, but Jane will have none of that.She thinks that the handwriting is often a real clue to the
personality and sincerity of the writer. I can't stand email', she says 'they're so cold and concise, I can't send someone back advice to a heartfelt difficulty in an email'! </fissa>
      <mobile>This person works harder  than they have to when replying to people.</mobile>
    </coppia>

    <coppia>
      <fissa>Melissa , I have retired from my lifelong job and passion of playing the piano in an orchestra. At least three or four days a week in the morning before breakfast I
write letters at my desk in an upstairs bedroom that has become my 'writing room'. 'I find it an enjoyable experience as important as talking to people'. As I am deaf in one ear, I find the telephone difficult and I don't have email. Letters written by hand are an exchange of energy between people. It's like the energy that passes between a musician and audience during a concert, which doesn't happen with the electronic mail and a keyboard.</fissa>
      <mobile>this person compares letter-writing with another activity</mobile>
    </coppia>

    <coppia>
      <fissa>Melissa , I have retired from my lifelong job and passion of playing the piano in an orchestra. At least three or four days a week in the morning before breakfast I
write letters at my desk in an upstairs bedroom that has become my 'writing room'. 'I find it an enjoyable experience as important as talking to people'. As I am deaf in one ear, I find the telephone difficult and I don't have email. Letters written by hand are an exchange of energy between people. It's like the energy that passes between a musician and audience during a concert, which doesn't happen with the electronic mail and a keyboard.</fissa>
      <mobile>this person chooses to communicate by letter for health reasons</mobile>
    </coppia>

  </coppie>
</domandaabbinamentomultiplo>
`;

const DomandaAbbinamentoSingolo = `
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
`;

const DomandaWordPool = `
<domandawordpool>
  <prologo>&amp;nbsp;Trascina tutte le parole date nel riquadro corrispondente.</prologo>
  <testo>Hills / visual arts / water</testo>
  <wordpools>
    <wordpool>
      <pool>In the hills</pool>
      <words>grass / shade / breeze / vista / bush</words>
    </wordpool>
    <wordpool>
      <pool>Visual Art forms</pool>
      <words>painting / film / drawing / engraving / sculpture / photo</words>
    </wordpool>
    <wordpool>
      <pool>Bodies of water</pool>
      <words>lake / sea / pond / ocean / pool</words>
    </wordpool>
  </wordpools>
</domandawordpool>
`;

const xmlData = `
<Domande>
${DomandaSceltaSingola}
${DomandaRiordino}
${DomandaScritturaLibera}
${DomandaComprensioneTesto}
${DomandaSceltaMultipla}

${DomandaRiempimentoTesto}
${DomandaRiempimentoTestoLibero}
${DomandaRiempimentoLibero}
${DomandaOutputStudente}
${DomandaAbbinamentoMultiplo}
${DomandaAbbinamentoSingolo}
${DomandaWordPool}
</Domande>
`;

const script = `
<insiemi_domande>
	<domande>
		<sql>SELECT domande.id, domande.specie, domande.data, "tipiDomanda".descrizione AS tipo, autori.descrizione AS autore, livelli.descrizione AS livello
FROM domande JOIN "tipiDomanda" ON domande.tipo = "tipiDomanda".id JOIN autori ON domande.autore = autori.id JOIN livelli ON domande.livello = livelli.id
WHERE domande.attiva = 1 AND domande.lingua = '1' AND domande.livello = 2 AND domande.specie = 7 AND (domande.tipo = 4 OR domande.tipo = 5 OR domande.tipo = 6 OR domande.tipo = 7 OR domande.tipo = 8 OR domande.tipo = 9 OR domande.tipo = 10 OR domande.tipo = 11 OR domande.tipo = 12 OR domande.tipo = 17 OR domande.tipo = 18 OR domande.tipo = 19 OR domande.tipo = 20 OR domande.tipo = 21 OR domande.tipo = 22 OR domande.tipo = 23 OR domande.tipo = 24 OR domande.tipo = 25) AND domande.specializzazione = 1 ORDER BY rand()
 LIMIT 2</sql>
		<domanda autore="Robin Evers" id="14435" livello="A2" peso="1" tag="LG_temp" tecnica="7">
			<domandariempimentotesto>
				<prologo>&amp;nbsp;Trascina l'opzione corretta in ogni spazio.</prologo>
				<testo>OBESITY IN MEXICO&lt;br&gt;&lt;br&gt;Mexico is a country with the second highest rate of obesity. The government says that around 37 million Mexicans are obese.&lt;br&gt;&lt;br&gt;The government wants to help these obese people %u2013 it ___1___ 30 health stations in 21 Metrobus stations in Mexico City. When somebody ___2___ in front of the station, it tells the person to do 10 squats. While you exercise, the station ___3___ you some advice on how to live a healthy life. When you%u2019re finished with the squats, the station gives you a free ticket!&lt;br&gt;&lt;br&gt;Experts ___4___ that so many people in Mexico are obese because of unhealthy food and drinks.</testo>
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
  DomandaSceltaSingola,
  DomandaRiordino,
  DomandaSceltaMultipla,
  DomandaComprensioneTesto,
  DomandaScritturaLibera,
  DomandaRiempimentoTesto,
  DomandaRiempimentoTestoLibero,
  DomandaRiempimentoLibero,
  DomandaOutputStudente,
  DomandaAbbinamentoMultiplo,
  DomandaAbbinamentoSingolo,
  DomandaWordPool,
  xmlData,
  script,
};
