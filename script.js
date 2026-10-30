// ROHBEIR V13 — full website intro built from the six approved cut-paper blooms.
(() => {
  'use strict';
  const overlay=document.getElementById('garden-intro');
  const canvas=document.getElementById('garden-canvas');
  const word=document.getElementById('garden-wordmark');
  const edition=document.getElementById('garden-edition');
  const cue=document.getElementById('garden-scrollcue');
  const progressBar=document.getElementById('garden-progress-fill');
  if(!overlay || !canvas) return;
  const ctx=canvas.getContext('2d', {alpha:false, desynchronized:true});
  if(!ctx) return;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  const FLOWERS=[{"id": "original", "name": "The Original", "subtitle": "The approved open, radial paper bloom", "character": "Open / radial", "stem": "assets/b12.png", "sepals": "assets/b11.png", "stamen": "assets/b01.png", "stamenPos": [-4, -14], "stamenScale": 1, "tilt": 0, "budScale": 1, "petals": [{"file": "assets/p00.png", "anchor": [0.52, 0.94], "openAngle": -174, "budAngle": -39, "scale": 1.04, "phase": 0.0, "tipBias": -6}, {"file": "assets/p02.png", "anchor": [0.5, 0.94], "openAngle": -144, "budAngle": -31, "scale": 0.94, "phase": 0.06, "tipBias": -2}, {"file": "assets/p03.png", "anchor": [0.8, 0.9], "openAngle": -116, "budAngle": -24, "scale": 0.95, "phase": 0.12, "tipBias": 2}, {"file": "assets/p06.png", "anchor": [0.18, 0.94], "openAngle": -84, "budAngle": -17, "scale": 1.04, "phase": 0.0, "tipBias": 6}, {"file": "assets/p07.png", "anchor": [0.8, 0.9], "openAngle": -53, "budAngle": -11, "scale": 1.07, "phase": 0.06, "tipBias": -6}, {"file": "assets/p08.png", "anchor": [0.51, 0.96], "openAngle": -22, "budAngle": -5, "scale": 0.94, "phase": 0.12, "tipBias": -2}, {"file": "assets/p10.png", "anchor": [0.52, 0.97], "openAngle": 9, "budAngle": 4, "scale": 1.04, "phase": 0.0, "tipBias": 2}, {"file": "assets/p11.png", "anchor": [0.82, 0.92], "openAngle": 39, "budAngle": 11, "scale": 1.08, "phase": 0.06, "tipBias": 6}, {"file": "assets/p12.png", "anchor": [0.83, 0.91], "openAngle": 70, "budAngle": 18, "scale": 0.93, "phase": 0.12, "tipBias": -6}, {"file": "assets/p15.png", "anchor": [0.58, 0.96], "openAngle": 100, "budAngle": 24, "scale": 0.99, "phase": 0.0, "tipBias": -2}, {"file": "assets/p16.png", "anchor": [0.54, 0.94], "openAngle": 131, "budAngle": 32, "scale": 0.93, "phase": 0.06, "tipBias": 2}, {"file": "assets/p18.png", "anchor": [0.84, 0.9], "openAngle": 162, "budAngle": 40, "scale": 0.95, "phase": 0.12, "tipBias": 6}]}, {"id": "crown", "name": "The Crown", "subtitle": "Tall cupped silhouette; petals gather like a paper coronet", "character": "Upright / cupped", "petals": [{"file": "assets/p03.png", "anchor": [0.8, 0.9], "openAngle": -128, "budAngle": -32.0, "scale": 1.149239303448367, "phase": 0.0, "tipBias": 0, "xdrift": 4.99798613438724, "ydrift": 6.5795465408147376, "spread": 1.1319330835164647, "front": false}, {"file": "assets/p00.png", "anchor": [0.52, 0.94], "openAngle": -107, "budAngle": -24.88888888888889, "scale": 1.283678217401015, "phase": 0.035, "tipBias": 0, "xdrift": -6.522424963566362, "ydrift": 7.780469578155822, "spread": 1.0624092192598424, "front": false}, {"file": "assets/p02.png", "anchor": [0.5, 0.94], "openAngle": -87, "budAngle": -17.77777777777778, "scale": 1.2594139524786525, "phase": 0.07, "tipBias": 0, "xdrift": 3.778694422473368, "ydrift": 0.23889155114085625, "spread": 1.0097354922187647, "front": false}, {"file": "assets/p06.png", "anchor": [0.18, 0.94], "openAngle": -67, "budAngle": -10.666666666666668, "scale": 1.1860836297033395, "phase": 0.10500000000000001, "tipBias": 0, "xdrift": -8.420759390955993, "ydrift": -7.736570902620608, "spread": 0.9256329338224081, "front": false}, {"file": "assets/p09.png", "anchor": [0.57, 0.94], "openAngle": -43, "budAngle": -3.555555555555557, "scale": 1.2420777048198306, "phase": 0.0, "tipBias": 0, "xdrift": 1.9016087955481975, "ydrift": -3.6805082880203788, "spread": 1.1464318848990194, "front": true}, {"file": "assets/p10.png", "anchor": [0.52, 0.97], "openAngle": -17, "budAngle": 3.555555555555557, "scale": 1.2382895547602126, "phase": 0.035, "tipBias": 0, "xdrift": 6.227592988437937, "ydrift": 1.5852643254541245, "spread": 0.9968471793744241, "front": true}, {"file": "assets/p08.png", "anchor": [0.51, 0.96], "openAngle": 11, "budAngle": 10.666666666666664, "scale": 1.1499577394121479, "phase": 0.07, "tipBias": 0, "xdrift": 10.805614931842921, "ydrift": -5.199554438443627, "spread": 1.134962472421794, "front": true}, {"file": "assets/p13.png", "anchor": [0.54, 0.93], "openAngle": 34, "budAngle": 17.77777777777778, "scale": 1.2330952847305487, "phase": 0.10500000000000001, "tipBias": 0, "xdrift": 3.887773308672294, "ydrift": 5.29072297057192, "spread": 0.9026165229877994, "front": true}, {"file": "assets/p04.png", "anchor": [0.53, 0.95], "openAngle": 64, "budAngle": 24.888888888888886, "scale": 1.0340917282304123, "phase": 0.0, "tipBias": 0, "xdrift": 10.956938142967328, "ydrift": 7.220305474906043, "spread": 1.0142498026845717, "front": true}, {"file": "assets/p19.png", "anchor": [0.53, 0.95], "openAngle": 95, "budAngle": 32.0, "scale": 1.034374297982959, "phase": 0.035, "tipBias": 0, "xdrift": -0.4547507513144211, "ydrift": -7.749627621500114, "spread": 1.0928900470021354, "front": true}], "stem": "assets/b12.png", "sepals": "assets/b14.png", "stamen": "assets/b00.png", "stamenScale": 1.08, "stamenPos": [0, -19], "tilt": -6, "budScale": 0.93, "offset": [0, 16], "openBaseHeight": 240, "closedBaseHeight": 85, "frontStamen": false, "stemAngle": -7, "sepalAngle": 0, "spreadX": 12, "spreadY": 8}, {"id": "windward", "name": "The Windward", "subtitle": "Petals lean to one side, like wind catching a paper fan", "character": "Side-swept / diagonal", "petals": [{"file": "assets/p04.png", "anchor": [0.53, 0.95], "openAngle": -153, "budAngle": -32.0, "scale": 1.0582746475203473, "phase": 0.0, "tipBias": 0, "xdrift": -6.002113866855403, "ydrift": 2.952819352339702, "spread": 1.1376142642309668, "front": false}, {"file": "assets/p05.png", "anchor": [0.57, 0.94], "openAngle": -134, "budAngle": -24.88888888888889, "scale": 0.9819106934240617, "phase": 0.035, "tipBias": 0, "xdrift": -9.055465027770177, "ydrift": 0.6012643232903709, "spread": 0.9377994734568429, "front": false}, {"file": "assets/p07.png", "anchor": [0.8, 0.9], "openAngle": -117, "budAngle": -17.77777777777778, "scale": 1.2262631244413424, "phase": 0.07, "tipBias": 0, "xdrift": -10.667970445871177, "ydrift": 6.889735954666815, "spread": 1.0898644345806787, "front": false}, {"file": "assets/p11.png", "anchor": [0.82, 0.92], "openAngle": -87, "budAngle": -10.666666666666668, "scale": 1.3190304448878254, "phase": 0.10500000000000001, "tipBias": 0, "xdrift": -8.635588656875955, "ydrift": 3.7542060111326148, "spread": 0.9611912271281511, "front": false}, {"file": "assets/p12.png", "anchor": [0.83, 0.91], "openAngle": -54, "budAngle": -3.555555555555557, "scale": 1.3946068761268433, "phase": 0.0, "tipBias": 0, "xdrift": -7.488786014984879, "ydrift": -6.931909268863924, "spread": 0.9938422990207458, "front": false}, {"file": "assets/p00.png", "anchor": [0.52, 0.94], "openAngle": -22, "budAngle": 3.555555555555557, "scale": 1.22874107306756, "phase": 0.035, "tipBias": 0, "xdrift": -4.684391736477231, "ydrift": -6.641665210950141, "spread": 1.1134479119383025, "front": true}, {"file": "assets/p03.png", "anchor": [0.8, 0.9], "openAngle": 7, "budAngle": 10.666666666666664, "scale": 1.274002536864059, "phase": 0.07, "tipBias": 0, "xdrift": -7.703284061365843, "ydrift": 4.3271099673288695, "spread": 0.914037131839929, "front": true}, {"file": "assets/p17.png", "anchor": [0.5, 0.95], "openAngle": 37, "budAngle": 17.77777777777778, "scale": 1.0867502309537178, "phase": 0.10500000000000001, "tipBias": 0, "xdrift": -9.490389213870143, "ydrift": 7.596721058058378, "spread": 1.0517843082174492, "front": true}, {"file": "assets/p18.png", "anchor": [0.84, 0.9], "openAngle": 68, "budAngle": 24.888888888888886, "scale": 0.9612559438232737, "phase": 0.0, "tipBias": 0, "xdrift": 2.9157474268265666, "ydrift": -6.816070168099481, "spread": 1.0399593033027639, "front": true}, {"file": "assets/p14.png", "anchor": [0.51, 0.95], "openAngle": 111, "budAngle": 32.0, "scale": 0.9056368467074147, "phase": 0.035, "tipBias": 0, "xdrift": 2.779515935419104, "ydrift": -5.562607426819593, "spread": 0.979156031207044, "front": true}], "stem": "assets/b12.png", "sepals": "assets/b11.png", "stamen": "assets/b01.png", "stamenScale": 1, "stamenPos": [22, -9], "tilt": 26, "budScale": 1, "offset": [0, 5], "openBaseHeight": 230, "closedBaseHeight": 84, "frontStamen": false, "stemAngle": -22, "sepalAngle": 0, "spreadX": 29, "spreadY": 18}, {"id": "rosette", "name": "The Rosette", "subtitle": "A dense layered paper rosette with an inner crown", "character": "Dense / layered", "petals": [{"file": "assets/p00.png", "anchor": [0.52, 0.94], "openAngle": -165, "budAngle": -32.0, "scale": 1.108806229202857, "phase": 0.0, "tipBias": 0, "xdrift": -4.542187007628823, "ydrift": -5.620390513974563, "spread": 1.0231691145556814, "front": false}, {"file": "assets/p12.png", "anchor": [0.83, 0.91], "openAngle": -126, "budAngle": -27.733333333333334, "scale": 1.092163045104653, "phase": 0.035, "tipBias": 0, "xdrift": 10.466918219804839, "ydrift": -5.96784528147959, "spread": 0.9240864151179629, "front": false}, {"file": "assets/p06.png", "anchor": [0.18, 0.94], "openAngle": -86, "budAngle": -23.46666666666667, "scale": 1.1298716523538062, "phase": 0.07, "tipBias": 0, "xdrift": 4.025349616208985, "ydrift": -2.142658084782777, "spread": 0.9723268545816213, "front": false}, {"file": "assets/p07.png", "anchor": [0.8, 0.9], "openAngle": -48, "budAngle": -19.2, "scale": 1.1300250082677337, "phase": 0.10500000000000001, "tipBias": 0, "xdrift": -8.355140094388746, "ydrift": 4.5697944778409205, "spread": 0.9106601272205431, "front": false}, {"file": "assets/p11.png", "anchor": [0.82, 0.92], "openAngle": -4, "budAngle": -14.933333333333334, "scale": 1.1967306468148322, "phase": 0.0, "tipBias": 0, "xdrift": 11.81077452873182, "ydrift": 1.3108948644706206, "spread": 0.9796438329590591, "front": false}, {"file": "assets/p02.png", "anchor": [0.5, 0.94], "openAngle": 35, "budAngle": -10.666666666666668, "scale": 1.1614123061836836, "phase": 0.035, "tipBias": 0, "xdrift": 11.886117027567039, "ydrift": 6.5395544004033965, "spread": 0.955448691066985, "front": false}, {"file": "assets/p17.png", "anchor": [0.5, 0.95], "openAngle": 74, "budAngle": -6.399999999999999, "scale": 1.1362208280670776, "phase": 0.07, "tipBias": 0, "xdrift": -0.718261860528667, "ydrift": -0.8245592853844457, "spread": 0.931941954121296, "front": false}, {"file": "assets/p18.png", "anchor": [0.84, 0.9], "openAngle": 117, "budAngle": -2.133333333333333, "scale": 1.1247639066018793, "phase": 0.10500000000000001, "tipBias": 0, "xdrift": -11.292495814470943, "ydrift": -6.267139399435482, "spread": 1.0453833437179028, "front": false}, {"file": "assets/p10.png", "anchor": [0.52, 0.97], "openAngle": 157, "budAngle": 2.133333333333333, "scale": 1.11047110054492, "phase": 0.0, "tipBias": 0, "xdrift": -4.341635993001136, "ydrift": 2.6905219115681955, "spread": 0.9918799884909265, "front": false}, {"file": "assets/p01.png", "anchor": [0.55, 0.94], "openAngle": -148, "budAngle": 6.399999999999999, "scale": 0.6848662326332955, "phase": 0.035, "tipBias": 0, "xdrift": 10.88338340195601, "ydrift": -0.6439879055634954, "spread": 1.046094518763665, "front": true}, {"file": "assets/p08.png", "anchor": [0.51, 0.96], "openAngle": -89, "budAngle": 10.666666666666664, "scale": 0.7206045956090212, "phase": 0.07, "tipBias": 0, "xdrift": -2.501615451877722, "ydrift": 4.39600172916048, "spread": 1.081896399387852, "front": true}, {"file": "assets/p04.png", "anchor": [0.53, 0.95], "openAngle": -29, "budAngle": 14.93333333333333, "scale": 0.6878235917921163, "phase": 0.10500000000000001, "tipBias": 0, "xdrift": 7.073139715174506, "ydrift": 6.30609213875581, "spread": 0.944940413244834, "front": true}, {"file": "assets/p09.png", "anchor": [0.57, 0.94], "openAngle": 27, "budAngle": 19.200000000000003, "scale": 0.7792011267049175, "phase": 0.0, "tipBias": 0, "xdrift": -2.6785785819892904, "ydrift": -0.25708698868633384, "spread": 0.9758703058627043, "front": true}, {"file": "assets/p13.png", "anchor": [0.54, 0.93], "openAngle": 83, "budAngle": 23.46666666666667, "scale": 0.7148563004261803, "phase": 0.035, "tipBias": 0, "xdrift": 8.80118592190249, "ydrift": -5.405283451565394, "spread": 1.1066846558552068, "front": true}, {"file": "assets/p15.png", "anchor": [0.58, 0.96], "openAngle": 144, "budAngle": 27.733333333333334, "scale": 0.7441350254359532, "phase": 0.07, "tipBias": 0, "xdrift": -8.342098460147241, "ydrift": -1.562410949399597, "spread": 1.1396030366824654, "front": true}, {"file": "assets/p16.png", "anchor": [0.54, 0.94], "openAngle": 184, "budAngle": 32.0, "scale": 0.6532002732113402, "phase": 0.10500000000000001, "tipBias": 0, "xdrift": 0.07815878053845893, "ydrift": 3.5560604977145633, "spread": 1.1171767183253212, "front": true}], "stem": "assets/b12.png", "sepals": "assets/b14.png", "stamen": "assets/b03.png", "stamenScale": 0.61, "stamenPos": [0, -6], "tilt": 0, "budScale": 1, "offset": [0, 0], "openBaseHeight": 228, "closedBaseHeight": 78, "frontStamen": false, "stemAngle": 5, "sepalAngle": 0, "spreadX": 10, "spreadY": 10}, {"id": "wild", "name": "The Wildflower", "subtitle": "Irregular wide petals and sharper lifted paper wings", "character": "Splayed / eccentric", "petals": [{"file": "assets/p07.png", "anchor": [0.8, 0.9], "openAngle": -169, "budAngle": -32.0, "scale": 1.1593273679128726, "phase": 0.0, "tipBias": 0, "xdrift": -3.490928026295263, "ydrift": -7.3665971247500615, "spread": 1.0900808292184412, "front": false}, {"file": "assets/p18.png", "anchor": [0.84, 0.9], "openAngle": -127, "budAngle": -24.0, "scale": 1.0529568421502957, "phase": 0.035, "tipBias": 0, "xdrift": -0.12819232522253365, "ydrift": 5.308949603719306, "spread": 1.0251248929716454, "front": false}, {"file": "assets/p00.png", "anchor": [0.52, 0.94], "openAngle": -82, "budAngle": -16.0, "scale": 1.3335235142005422, "phase": 0.07, "tipBias": 0, "xdrift": 2.4743784661058683, "ydrift": -6.7205150905495845, "spread": 1.0607142395739206, "front": false}, {"file": "assets/p09.png", "anchor": [0.57, 0.94], "openAngle": -45, "budAngle": -8.0, "scale": 0.9467120715408018, "phase": 0.10500000000000001, "tipBias": 0, "xdrift": -4.207604404084591, "ydrift": 2.1968552009413216, "spread": 1.122269553920299, "front": false}, {"file": "assets/p03.png", "anchor": [0.8, 0.9], "openAngle": 0, "budAngle": 0.0, "scale": 1.3561562882614127, "phase": 0.0, "tipBias": 0, "xdrift": 4.995473993614372, "ydrift": 6.677445832422798, "spread": 0.9469369134728386, "front": false}, {"file": "assets/p12.png", "anchor": [0.83, 0.91], "openAngle": 36, "budAngle": 8.0, "scale": 0.9930398501187049, "phase": 0.035, "tipBias": 0, "xdrift": 1.4308890223936697, "ydrift": 2.6318395490271875, "spread": 0.9431437044966278, "front": true}, {"file": "assets/p06.png", "anchor": [0.18, 0.94], "openAngle": 77, "budAngle": 16.0, "scale": 1.1379679558183748, "phase": 0.07, "tipBias": 0, "xdrift": 10.8520704116637, "ydrift": 5.447515623434894, "spread": 0.9751075136713758, "front": true}, {"file": "assets/p04.png", "anchor": [0.53, 0.95], "openAngle": 119, "budAngle": 24.0, "scale": 0.9421948429290744, "phase": 0.10500000000000001, "tipBias": 0, "xdrift": -1.8225383937794994, "ydrift": 3.139873800855691, "spread": 1.0839563458438304, "front": true}, {"file": "assets/p11.png", "anchor": [0.82, 0.92], "openAngle": 169, "budAngle": 32.0, "scale": 1.1385698215787627, "phase": 0.0, "tipBias": 0, "xdrift": 9.048074258659181, "ydrift": -7.643104234384511, "spread": 1.012859561231802, "front": true}], "stem": "assets/b12.png", "sepals": "assets/b11.png", "stamen": "assets/b00.png", "stamenScale": 0.85, "stamenPos": [-10, -18], "tilt": -17, "budScale": 1, "offset": [0, 0], "openBaseHeight": 240, "closedBaseHeight": 82, "frontStamen": false, "stemAngle": 9, "sepalAngle": 0, "spreadX": 28, "spreadY": 24}, {"id": "sidecup", "name": "The Side Cup", "subtitle": "An off-axis flower; the far petals fold behind the near edge", "character": "Profile / spiral", "petals": [{"file": "assets/p01.png", "anchor": [0.55, 0.94], "openAngle": -161, "budAngle": -32.0, "scale": 0.7620905023869183, "phase": 0.0, "tipBias": 0, "xdrift": -0.45681437335062824, "ydrift": -6.234997089249832, "spread": 1.1269455068178187, "front": false}, {"file": "assets/p16.png", "anchor": [0.54, 0.94], "openAngle": -124, "budAngle": -25.6, "scale": 0.8814601533027282, "phase": 0.035, "tipBias": 0, "xdrift": -11.424921635481748, "ydrift": -4.829815926347944, "spread": 1.0172653806513894, "front": false}, {"file": "assets/p13.png", "anchor": [0.54, 0.93], "openAngle": -91, "budAngle": -19.2, "scale": 1.0588324072350752, "phase": 0.07, "tipBias": 0, "xdrift": 6.645811800772318, "ydrift": -5.732207286271905, "spread": 0.9251686871200094, "front": false}, {"file": "assets/p08.png", "anchor": [0.51, 0.96], "openAngle": -66, "budAngle": -12.8, "scale": 1.1101824983584927, "phase": 0.10500000000000001, "tipBias": 0, "xdrift": 11.526248481827533, "ydrift": 6.635024668183226, "spread": 1.028777019357033, "front": false}, {"file": "assets/p02.png", "anchor": [0.5, 0.94], "openAngle": -43, "budAngle": -6.399999999999999, "scale": 1.287386021070938, "phase": 0.0, "tipBias": 0, "xdrift": 5.530483048816034, "ydrift": 5.6813993983462865, "spread": 0.9998378689361034, "front": false}, {"file": "assets/p05.png", "anchor": [0.57, 0.94], "openAngle": -15, "budAngle": 0.0, "scale": 1.27101223020926, "phase": 0.035, "tipBias": 0, "xdrift": 9.80161434218924, "ydrift": 4.249575884759551, "spread": 1.1291989657106243, "front": false}, {"file": "assets/p17.png", "anchor": [0.5, 0.95], "openAngle": 17, "budAngle": 6.399999999999999, "scale": 1.2639223488687017, "phase": 0.07, "tipBias": 0, "xdrift": -5.034609333046052, "ydrift": 0.3559092950196696, "spread": 0.9862340567618505, "front": true}, {"file": "assets/p15.png", "anchor": [0.58, 0.96], "openAngle": 43, "budAngle": 12.799999999999997, "scale": 1.092926095686423, "phase": 0.10500000000000001, "tipBias": 0, "xdrift": -9.91671715132585, "ydrift": 7.570131610693085, "spread": 0.9672415091359592, "front": true}, {"file": "assets/p14.png", "anchor": [0.51, 0.95], "openAngle": 75, "budAngle": 19.200000000000003, "scale": 0.9715109398981556, "phase": 0.0, "tipBias": 0, "xdrift": 8.868942686887628, "ydrift": 2.66667501900522, "spread": 0.9684353773447972, "front": true}, {"file": "assets/p19.png", "anchor": [0.53, 0.95], "openAngle": 109, "budAngle": 25.6, "scale": 0.9624135700900478, "phase": 0.035, "tipBias": 0, "xdrift": 3.953083384450295, "ydrift": -2.097468584698003, "spread": 1.0143002387780573, "front": true}, {"file": "assets/p10.png", "anchor": [0.52, 0.97], "openAngle": 149, "budAngle": 32.0, "scale": 0.8816087913493786, "phase": 0.07, "tipBias": 0, "xdrift": -5.408370410582075, "ydrift": 3.7036314662741283, "spread": 0.9867889945566158, "front": true}], "stem": "assets/b12.png", "sepals": "assets/b11.png", "stamen": "assets/b02.png", "stamenScale": 0.76, "stamenPos": [20, -5], "tilt": 31, "budScale": 1, "offset": [12, 0], "openBaseHeight": 236, "closedBaseHeight": 87, "frontStamen": false, "stemAngle": -17, "sepalAngle": 0, "spreadX": 22, "spreadY": 15}];
  const IMAGES={};
  const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
  const smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
  const phase=(t,a,b)=>smooth((t-a)/(b-a));
  const mix=(a,b,t)=>a+(b-a)*t;
  const rad=Math.PI/180;
  let DPR=1,W=0,H=0,locked=!reduce.matches,progress=0,ready=false,dismissing=false;
  let touchStart=null;

  const layout=[
    {x:-150,y:-86,s:1.04,f:0,r:-10,exit:[-1.15,-0.24],delay:0.00},
    {x:110,y:-58,s:1.10,f:1,r:-18,exit:[-0.86,-0.62],delay:0.05},
    {x:396,y:-116,s:1.24,f:2,r:10,exit:[0.72,-0.56],delay:0.07},
    {x:696,y:-44,s:1.02,f:3,r:8,exit:[0.12,-1.1],delay:0.03},
    {x:968,y:-98,s:1.15,f:4,r:18,exit:[1.06,-0.15],delay:0.08},
    {x:1285,y:-28,s:1.06,f:5,r:-22,exit:[0.9,-0.7],delay:0.11},
    {x:1505,y:-102,s:1.03,f:0,r:15,exit:[1.18,-0.3],delay:0.04},

    {x:-118,y:184,s:1.11,f:2,r:-12,exit:[-1.06,-0.18],delay:0.09},
    {x:166,y:212,s:1.18,f:4,r:24,exit:[-0.66,-0.74],delay:0.02},
    {x:458,y:153,s:1.12,f:5,r:6,exit:[0.02,-1.2],delay:0.08},
    {x:758,y:216,s:1.18,f:3,r:-9,exit:[0.74,-0.72],delay:0.13},
    {x:1064,y:176,s:1.12,f:0,r:3,exit:[0.96,-0.16],delay:0.05},
    {x:1364,y:210,s:1.22,f:1,r:-16,exit:[1.12,-0.52],delay:0.1},

    {x:-192,y:448,s:1.18,f:5,r:12,exit:[-1.08,-0.08],delay:0.11},
    {x:74,y:455,s:1.06,f:3,r:-10,exit:[-0.78,-0.84],delay:0.06},
    {x:362,y:404,s:1.28,f:0,r:5,exit:[-0.12,-1.12],delay:0.03},
    {x:680,y:452,s:1.16,f:2,r:-7,exit:[0.36,-1.0],delay:0.12},
    {x:1008,y:398,s:1.23,f:5,r:18,exit:[0.94,-0.62],delay:0.07},
    {x:1298,y:470,s:1.06,f:1,r:-14,exit:[1.10,-0.28],delay:0.09},
    {x:1540,y:405,s:1.12,f:4,r:20,exit:[1.2,-0.22],delay:0.02},

    {x:-86,y:734,s:1.07,f:1,r:14,exit:[-1.08,-0.02],delay:0.1},
    {x:236,y:707,s:1.21,f:4,r:8,exit:[-0.72,-0.7],delay:0.04},
    {x:584,y:776,s:1.15,f:5,r:-15,exit:[-0.08,-1.14],delay:0.07},
    {x:901,y:706,s:1.18,f:0,r:10,exit:[0.48,-0.98],delay:0.13},
    {x:1211,y:784,s:1.26,f:2,r:-6,exit:[0.98,-0.64],delay:0.05},
    {x:1495,y:717,s:1.03,f:3,r:22,exit:[1.2,-0.14],delay:0.11}
  ];

  const allPaths=[...new Set(FLOWERS.flatMap(d=>[...d.petals.map(p=>'images/cutpaper-assets/'+p.file.split('/').pop()), 'images/cutpaper-assets/'+d.stem.split('/').pop(), 'images/cutpaper-assets/'+d.sepals.split('/').pop(), 'images/cutpaper-assets/'+d.stamen.split('/').pop()]))];
  Promise.all(allPaths.map(src=>new Promise(resolve=>{const im=new Image();IMAGES[src]=im;im.onload=()=>resolve();im.onerror=()=>resolve();im.src=src;}))).then(()=>{ready=true; resize(); render(); overlay.classList.add('is-ready');});

  function resize(){
    DPR=Math.min(window.devicePixelRatio||1,2);
    W=canvas.clientWidth=Math.max(1,window.innerWidth);
    H=canvas.clientHeight=Math.max(1,window.innerHeight);
    canvas.width=Math.round(W*DPR); canvas.height=Math.round(H*DPR);
    ctx.setTransform(DPR,0,0,DPR,0,0);
    render();
  }

  function cut(imgSrc, anchor, x, y, height, angle=0, opacity=1){
    const img=IMAGES[imgSrc]; if(!img||!img.complete||!img.naturalWidth) return;
    const w=img.naturalWidth*height/img.naturalHeight;
    ctx.save(); ctx.globalAlpha=opacity; ctx.translate(x,y); ctx.rotate(angle*rad);
    ctx.drawImage(img,-w*anchor[0],-height*anchor[1],w,height); ctx.restore();
  }

  function drawFlower(flower, instance, state){
    const centerX=instance.x*state.wallScale + state.offsetX + state.pullX;
    const centerY=instance.y*state.wallScale + state.offsetY + state.pullY;
    const baseScale=instance.s*state.wallScale;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((instance.r + state.rotation)*rad);
    ctx.scale(baseScale, baseScale);
    const b=state.bud;
    const stem='images/cutpaper-assets/'+flower.stem.split('/').pop();
    const sep='images/cutpaper-assets/'+flower.sepals.split('/').pop();
    const stam='images/cutpaper-assets/'+flower.stamen.split('/').pop();
    // stem and vine-like pull line
    const vineAlpha=mix(0.24,1,phase(progress,0.18,0.58));
    cut(stem,[.50,.09],2,36,154,flower.stemAngle??4,vineAlpha);
    cut(sep,[.50,.92],0,22,mix(120,141,b)*(flower.budScale||1),flower.sepalAngle||0,.97);
    const front=[];
    const petals=flower.petals;
    function drawPetal(p,i){
      const q=phase(b,Math.max(0,(p.phase||0)-.055),Math.min(1,.91+(p.phase||0)));
      const a=mix(p.openAngle,p.budAngle,q)+(flower.tilt||0)*(1-q);
      const h=mix((flower.openBaseHeight||230)*p.scale,(flower.closedBaseHeight||84)*p.scale,q);
      const spread=(p.spread||1);
      const rx=mix(Math.sin(p.openAngle*rad)*(flower.spreadX??19)*spread+(p.xdrift||0),(i-(petals.length-1)/2)*2.1,q);
      const ry=mix(Math.cos(p.openAngle*rad)*(flower.spreadY??15)*spread+(p.ydrift||0),-8+(i%3)*4,q);
      const src='images/cutpaper-assets/'+p.file.split('/').pop();
      cut(src,p.anchor,rx,ry,h,a,1);
    }
    petals.forEach((p,i)=>{ if(p.front) front.push([p,i]); else drawPetal(p,i); });
    cut(stam,[.50,.96],...(flower.stamenPos||[0,-14]),mix(140,58,b)*(flower.stamenScale||1),0,mix(1,.12,b));
    front.forEach(([p,i])=>drawPetal(p,i));
    ctx.restore();
  }

  function render(){
    if(!ctx) return;
    ctx.save();
    ctx.setTransform(DPR,0,0,DPR,0,0);
    ctx.fillStyle='#d45311'; ctx.fillRect(0,0,W,H);
    // subtle paper grain dots / vignette
    const grad=ctx.createRadialGradient(W*.5,H*.48,Math.min(W,H)*.1,W*.5,H*.48,Math.max(W,H)*.72);
    grad.addColorStop(0,'rgba(255,190,150,.06)'); grad.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=grad; ctx.fillRect(0,0,W,H);
    if(!ready){ctx.restore(); return;}
    const wordOut=phase(progress,0.00,0.18);
    const bud=phase(progress,0.14,0.70);
    const pull=phase(progress,0.55,1.00);
    const siteReveal=phase(progress,0.90,1.00);
    const wallScale=Math.max(W/1536,H/980)*1.06;
    const offsetX=(W-1536*wallScale)/2;
    const offsetY=(H-900*wallScale)/2;

    // draw layered flowers in slight row order to preserve overlap richness
    layout.forEach((inst, idx)=>{
      const localBud=phase(bud, inst.delay*0.55, Math.min(1,0.92+inst.delay*0.2));
      const localPull=phase(pull, inst.delay*0.45, Math.min(1,0.96+inst.delay*0.08));
      const dx=inst.exit[0]*(W*0.95)*localPull;
      const dy=inst.exit[1]*(H*0.95)*localPull;
      const jitter=Math.sin((progress+idx*0.07)*Math.PI*2)*4*(1-localPull);
      drawFlower(FLOWERS[inst.f], inst, {
        bud: localBud,
        pullX: dx,
        pullY: dy,
        rotation: jitter,
        wallScale,
        offsetX,
        offsetY
      });
    });
    ctx.restore();

    word.style.transform=`translate(-50%, calc(-50% - ${wordOut*120}vh))`;
    word.style.opacity=String(1-phase(progress,0.04,0.18));
    edition.style.opacity=String(1-phase(progress,0.06,0.24));
    cue.style.opacity=String(1-phase(progress,0.00,0.16));
    progressBar.style.transform=`scaleX(${progress.toFixed(4)})`;
    overlay.style.opacity=String(1-siteReveal);
  }

  function setProgress(v){
    const next=clamp(v);
    if(Math.abs(next-progress)<0.0001) return;
    progress=next; render();
    if(progress>=0.998 && !dismissing) dismissIntro();
  }

  function dismissIntro(){
    dismissing=true;
    overlay.classList.add('is-dismissed');
    document.body.classList.remove('intro-locked');
    setTimeout(()=>{overlay.style.display='none';},360);
  }

  function step(delta){
    if(!locked || dismissing) return;
    setProgress(progress + delta);
  }

  function wheelHandler(e){
    if(!locked || dismissing) return;
    e.preventDefault();
    const delta=(Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX);
    step(delta*0.00145);
  }
  function keyHandler(e){
    if(!locked || dismissing) return;
    if(['ArrowDown','PageDown',' ','Enter'].includes(e.key)){e.preventDefault();step(0.1);}
    else if(['ArrowUp','PageUp'].includes(e.key)){e.preventDefault();step(-0.08);}
    else if(e.key==='Escape'){e.preventDefault();setProgress(1);}
  }
  function touchStartHandler(e){ if(!locked||dismissing||!e.touches[0]) return; touchStart=e.touches[0].clientY; }
  function touchMoveHandler(e){
    if(!locked || dismissing || touchStart==null || !e.touches[0]) return;
    e.preventDefault();
    const dy=touchStart - e.touches[0].clientY;
    touchStart=e.touches[0].clientY;
    step(dy*0.0032);
  }
  function touchEndHandler(){ touchStart=null; }
  function clickCue(){ step(0.16); }

  cue?.addEventListener('click', clickCue);
  window.addEventListener('resize', resize, {passive:true});
  window.addEventListener('wheel', wheelHandler, {passive:false});
  window.addEventListener('keydown', keyHandler);
  window.addEventListener('touchstart', touchStartHandler, {passive:true});
  window.addEventListener('touchmove', touchMoveHandler, {passive:false});
  window.addEventListener('touchend', touchEndHandler, {passive:true});

  if(locked) document.body.classList.add('intro-locked');
  if(reduce.matches){ progress=1; dismissIntro(); }
  render();
})();

// Existing site interactions.
(() => {
  const menu=document.querySelector('.menu'), panel=document.querySelector('.menu-panel');
  if(menu && panel){
    menu.addEventListener('click',()=>{const active=panel.classList.toggle('open'); menu.setAttribute('aria-expanded',String(active));});
    panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>panel.classList.remove('open')));
  }
  const io=('IntersectionObserver' in window) ? new IntersectionObserver((entries)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('seen'); io.unobserve(entry.target);}}),{threshold:.06}) : null;
  if(io) document.querySelectorAll('.work-card,.work-head,.about-grid,.contact h2').forEach(el=>{el.classList.add('reveal'); io.observe(el);});
})();
