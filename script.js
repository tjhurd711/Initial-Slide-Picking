// Memorial Slideshow Customization Form - Main JavaScript
// Handles form logic, validation, and submission to Zapier

// === ZAPIER WEBHOOK CONFIGURATION ===
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/19825049/um44ula/';

// Set max date to today for death date field
document.addEventListener('DOMContentLoaded', function() {
    const deathdateInput = document.getElementById('deathdate');
    const today = new Date().toISOString().split('T')[0];
    deathdateInput.setAttribute('max', today);
});

// Template data with all themes including Vibrant (47 templates)
const TEMPLATES = {
    blue: [
        { id: 'beach_blue', name: 'Beach', url: 'https://dl.dropboxusercontent.com/scl/fi/dj5mzvmg8376o423d27uq/BeachP-Blue.jpg?rlkey=lg0fbwx7xj215eclg1znu1jxd&st=ogkcpetm' },
        { id: 'clouds_blue', name: 'Clouds', url: 'https://dl.dropboxusercontent.com/scl/fi/fen11psniha46iwjms383/Clouds-Blue.jpg?rlkey=hc2rrceduldrecz2aqhp8kda2&st=3ckvobbv' },
        { id: 'fading_hearts_blue', name: 'Fading Hearts', url: 'https://dl.dropboxusercontent.com/scl/fi/n533cqoxffakpbsxp8d8z/Fading-Hearts-Blue.jpg?rlkey=dqm0tppw6d69zq6n4whxectp5&st=dd0h9dtq' },
        { id: 'fish_blue', name: 'Fish', url: 'https://dl.dropboxusercontent.com/scl/fi/b8di7d8f2n2k17h6ylq4v/Fish-Blue.jpg?rlkey=6bz7l5srdvz6x5pvlckjkuntf&st=iuf3fm9s' },
        { id: 'golf_blue', name: 'Golf', url: 'https://dl.dropboxusercontent.com/scl/fi/yy2lzifprzqsr3hpbx32i/Golf-Blue.jpg?rlkey=h6509taofzshwu5v6lea0tzuv&st=y71f2odi' },
        { id: 'gradient_blue', name: 'Gradient', url: 'https://dl.dropboxusercontent.com/scl/fi/vdq986vi8rnm35gcbicr4/Gradient-Blue.jpg?rlkey=0fwb3ntd0su0o83hvt76439x4&st=1fh8enw3' },
        { id: 'modern_blue', name: 'Modern', url: 'https://dl.dropboxusercontent.com/scl/fi/918cdbiofftso1ltvbio0/Modern-Blue.jpg?rlkey=l6wujvkettp2r62i8y1pfb2ui&st=x0q0u3u8' },
        { id: 'mountain_view_blue', name: 'Mountain View', url: 'https://dl.dropboxusercontent.com/scl/fi/t2vy923uptzn0twpel7sb/Mountain-View-Blue.jpg?rlkey=ek580gqqlalqzu5a1y4zywsd3&st=tf6pu5dg' },
        { id: 'us_flag_blue', name: 'US Flag', url: 'https://dl.dropboxusercontent.com/scl/fi/hvzahgnw41yjaktw1a1qc/USFlag-Blue.jpg?rlkey=ov3s5zqcrpom3cb02s3bdlnkz&st=anv2j2xv' },
        { id: 'wild_flowers_blue', name: 'Wild Flowers', url: 'https://dl.dropboxusercontent.com/scl/fi/53os5m1hglm4z143ln80d/Wild-Flowers-Blue.jpg?rlkey=rojdxq4a6ycjfxtyxy09vwmfx&st=eo3otum5' }
    ],
    gray: [
        { id: 'beach_gray', name: 'Beach', url: 'https://dl.dropboxusercontent.com/scl/fi/n5ckrdqh3zbf8j1784bov/BeachP-Gray.jpg?rlkey=w9qrs3b2lgd4xxnveossrkaa2&st=odeodmwp' },
        { id: 'clouds_gray', name: 'Clouds', url: 'https://dl.dropboxusercontent.com/scl/fi/7yvp2znooyrlsalpi98ap/Clouds-Gray.jpg?rlkey=awtsd5zj02xp9tj6ocxizrreu&st=nnulx4u7' },
        { id: 'fading_hearts_gray', name: 'Fading Hearts', url: 'https://dl.dropboxusercontent.com/scl/fi/ohqcxbnne3uyef7pt2tof/Fading-Hearts-Gray.jpg?rlkey=y42mlirt3dt8tkjv79mqxivtj&st=u8mruc3b' },
        { id: 'fish_gray', name: 'Fish', url: 'https://dl.dropboxusercontent.com/scl/fi/6nip6ht4uihouh6a4qlrl/Fish-Gray.jpg?rlkey=864yr70encb55uzmp5d3kc3k5&st=9uulac30' },
        { id: 'golf_gray', name: 'Golf', url: 'https://dl.dropboxusercontent.com/scl/fi/vgwclkxul6flwqf1y1kov/Golf-Gray.jpg?rlkey=unorrei8zsu38nl3uimax0lpz&st=ctjd0hhb' },
        { id: 'gradient_gray', name: 'Gradient', url: 'https://dl.dropboxusercontent.com/scl/fi/9aohm9wi4p5f2x7zwb7kr/Gradient-Gray.jpg?rlkey=22r4idxzevlmsrjjqq5qxsjsc&st=w0xbl1hg' },
        { id: 'modern_gray', name: 'Modern', url: 'https://dl.dropboxusercontent.com/scl/fi/bleufllefjsgpxt7f8pn2/Modern-Gray.jpg?rlkey=6co7y16d8ydzx4semv5obme3u&st=l0rwf7e2' },
        { id: 'mountain_view_gray', name: 'Mountain View', url: 'https://dl.dropboxusercontent.com/scl/fi/s96txf8z3mtvj2q98uxyr/Mountain-View-Gray.jpg?rlkey=8p0fccqa9ykjel6empdw1vh9m&st=tkihki7t' },
        { id: 'us_flag_gray', name: 'US Flag', url: 'https://dl.dropboxusercontent.com/scl/fi/iy59fc81jb1unqjp0t9hu/USFlag-Gray.jpg?rlkey=6v66l8snzuv2jhz7lo9y7alh4&st=rhxri02u' },
        { id: 'wild_flowers_gray', name: 'Wild Flowers', url: 'https://dl.dropboxusercontent.com/scl/fi/eun3o2h1vqol04535ak1x/Wild-Flowers-Gray.jpg?rlkey=01s179l4t14nqde7ahzacrxie&st=i3cf317p' }
    ],
    multi: [
        { id: 'beach_multi', name: 'Beach', url: 'https://dl.dropboxusercontent.com/scl/fi/km4me3jq48wujuelskoa4/BeachP-Multi.jpg?rlkey=x71wp2gp2q76u5ahm8hy7u7f5&st=w43naspo' },
        { id: 'clouds_multi', name: 'Clouds', url: 'https://dl.dropboxusercontent.com/scl/fi/hmtqvyo5sgjql5ywj8dfe/Clouds-MultiColor.jpg?rlkey=yuyjeicv26d04rmspyiewt9g6&st=7sy0i99y' },
        { id: 'fading_hearts_multi', name: 'Fading Hearts', url: 'https://dl.dropboxusercontent.com/scl/fi/2mqpp8jjydknt0o9e3m0f/Fading-Hearts2-MultiColor.jpg?rlkey=m93zmwhz7somq54lvu6bwyp47&st=u6r7mqya' },
        { id: 'fish_multi', name: 'Fish', url: 'https://dl.dropboxusercontent.com/scl/fi/uzcde02fw2dxyv0w9q5yc/Fish-Multi.jpg?rlkey=eckxs1xn31mhw50c3egnoj16z&st=hea23wsn' },
        { id: 'golf_multi', name: 'Golf', url: 'https://dl.dropboxusercontent.com/scl/fi/3hsgqohgwvw5nq6z6ara2/Golf-Multi.jpg?rlkey=b4sedjhzaih2ug64xp1k1d2yf&st=qh848w54' },
        { id: 'gradient_multi', name: 'Gradient', url: 'https://dl.dropboxusercontent.com/scl/fi/1xkk4t7isb3flveuz8x1d/Gradient-MultiColor.jpg?rlkey=mwguvnnpvwukteb5rczg84nfe&st=neq7piey' },
        { id: 'modern_multi', name: 'Modern', url: 'https://dl.dropboxusercontent.com/scl/fi/r73vpo5m9xlz0ri9ml571/Modern-MultiColor.jpg?rlkey=xqpnd9hzkinka9moyddwhut20&st=kee6aw07' },
        { id: 'mountain_view_multi', name: 'Mountain View', url: 'https://dl.dropboxusercontent.com/scl/fi/vxhrw09arznpqxft10w1h/Mountain-View-MultiColor.jpg?rlkey=6y84fz35bkwo0vil0jnb987hi&st=elnbavjh' },
        { id: 'us_flag_multi', name: 'US Flag', url: 'https://dl.dropboxusercontent.com/scl/fi/2wif65w9qqetrb98lbkt0/USFlag2-MultiColor.jpg?rlkey=ekkfqfvg1rk6qet57g7b9tbe7&st=oefqy66a' },
        { id: 'wild_flowers_multi', name: 'Wild Flowers', url: 'https://dl.dropboxusercontent.com/scl/fi/jxds1jv1q2807hsfa54kd/Wild-Flowers-MultiColor.jpg?rlkey=pdz2gbvi962whdne2rc3ri7uk&st=m7qntt53' }
    ],
    vibrant: [
        { id: 'autumn_vibrant', name: 'Autumn', url: 'https://dl.dropboxusercontent.com/scl/fi/72xy7ynll2m4snbm73o82/autumn-9251331_1280.jpg?rlkey=7vb1pp7sa363brvxg7cf2tdto&st=257y3ono&dl=1' },
        { id: 'sand_heart_vibrant', name: 'Sand Heart', url: 'https://dl.dropboxusercontent.com/scl/fi/ecaowe4p6t8rmc2p6nvfc/background-2349_1280.jpg?rlkey=35isum7v84cb38v53l1x9do5q&st=lwdfn7bk&dl=1' },
        { id: 'river_vibrant', name: 'River', url: 'https://dl.dropboxusercontent.com/scl/fi/ygzi5izm02gw1rjhiuxf8/lake-1679708_1280.jpg?rlkey=8j8t2v15vut2was7gy78ntp5v&st=5e1iv29q&dl=1' },
        { id: 'field_cross_vibrant', name: 'Field Cross', url: 'https://dl.dropboxusercontent.com/scl/fi/qgk2276fw1lpktk7wtf77/tree-6890174_1280.jpg?rlkey=dl3798ymp66j5ns8wr25itk96&st=rotvhz2y&dl=1' },
        { id: 'water_reflection_vibrant', name: 'Water Reflection', url: 'https://dl.dropboxusercontent.com/scl/fi/liyg3wafyffs8ssuazyfs/lago-di-limides-3025780_1280.jpg?rlkey=3qkzrsb36yhyb27ly8pz1f0fl&st=juwmunhs&dl=1' },
        { id: 'waterfall_vibrant', name: 'Waterfall', url: 'https://dl.dropboxusercontent.com/scl/fi/eblpmulbgb0p4q646tqwi/seljalandsfoss-1751463_1280.jpg?rlkey=9aco3d6b2g6hkdm8hzccd6996&st=y5dt2ewt&dl=1' },
        { id: 'golf_coast_vibrant', name: 'Golf Coast', url: 'https://dl.dropboxusercontent.com/scl/fi/ct7dnfs8yxau11xdp0731/sport-4842116_1280.jpg?rlkey=dapns12o5y5y6spb0hjrk94w8&st=kohvz1q2&dl=1' },
        { id: 'golf_woods_vibrant', name: 'Golf Woods', url: 'https://dl.dropboxusercontent.com/scl/fi/51tfg8r3w6k6gpwn2y3we/labor-day-2722962_1280.jpg?rlkey=arpmay8t8pkv8r1lzrqbrew9e&st=0g96yplo&dl=1' },
        { id: 'mountain_top_vibrant', name: 'Mountain Top', url: 'https://dl.dropboxusercontent.com/scl/fi/fkl3x71b50lldvl8q61zw/mountains-3778244_1280.jpg?rlkey=s52wq803tqlswd5nf25mzw5j9&st=zfnsekkq&dl=1' },
        { id: 'winter_vibrant', name: 'Winter', url: 'https://dl.dropboxusercontent.com/scl/fi/s3080b6u0i9hj4ax8tnie/winter-landscape-4532412_1280.jpg?rlkey=2wtfy34mnnahepblqy6fz78bm&st=517ppqoi&dl=1' },
        { id: 'america_agriculture_vibrant', name: 'America Agriculture', url: 'https://dl.dropboxusercontent.com/scl/fi/g87qwigh0zfvixw9cc73l/agriculture-1835918_1280.jpg?rlkey=ozx8x5q59ukbdjy8f1g2fn612&st=9pfoklel&dl=1' },
        { id: 'rainbow_reflection_vibrant', name: 'Rainbow Reflection', url: 'https://dl.dropboxusercontent.com/scl/fi/p3hdl3uq8ayxcebuwl4z9/rainbow-675832_1280.jpg?rlkey=gnxcxuy6ar0qwuperkp1ejogv&st=ff0ahsk5&dl=1' },
        { id: 'pink_flowers_vibrant', name: 'Pink Flowers', url: 'https://dl.dropboxusercontent.com/scl/fi/umd2bgsw17yzwwj65m858/flower-3219718_1280.jpg?rlkey=64632ci45stnobgrxu3xbiceh&st=y8g56dzs&dl=1' },
        { id: 'flower_sunset_vibrant', name: 'Flower Sunset', url: 'https://dl.dropboxusercontent.com/scl/fi/x6iv9nlkfwpuavbbqom9y/sunset-815270_1280-1.jpg?rlkey=2bp2taall72hx0ipbfxas3ak0&st=twg9wm5p&dl=1' },
        { id: 'beach_sunrise_vibrant', name: 'Beach Sunrise', url: 'https://dl.dropboxusercontent.com/scl/fi/knc8gvksvfj027i3p5dqj/beach-1852945_1280.jpg?rlkey=zmatvobxkob2etq0ri9qil1jj&st=9np6utc1&dl=1' },
        { id: 'farm_vibrant', name: 'Farm', url: 'https://dl.dropboxusercontent.com/scl/fi/ew820xe20pls3jvgm2ak4/farm-3455131_1280.jpg?rlkey=1vcslacgv158liyqtc041ec0s&st=w7jgbpy2&dl=1' },
        { id: 'lighthouse_vibrant', name: 'Lighthouse', url: 'https://dl.dropboxusercontent.com/scl/fi/8wo3zllldsdjs3z32e38u/santa-cruz-2287588-1280-1.jpg?rlkey=fggteaashnwxzqpl0jsq3lbu9&st=lsraf544&dl=1' },
        { id: 'butterfly_vibrant', name: 'Butterfly', url: 'https://dl.dropboxusercontent.com/scl/fi/knnaox65mxi48kayi9p83/butterfly-2169269_1280.jpg?rlkey=3tc60xm2q72yfda0cn069y4fa&st=ub1mf2lj&dl=1' },
        { id: 'rainbow_waterfall_vibrant', name: 'Rainbow Waterfall', url: 'https://dl.dropboxusercontent.com/scl/fi/wgl6m5wt7pfv4mkfk33nz/hill-2601798_1280-1.jpg?rlkey=sf8yo4y75euxx3ue7ibttt63o&st=bajw8juu&dl=1' },
        { id: 'above_clouds_vibrant', name: 'Above the Clouds', url: 'https://dl.dropboxusercontent.com/scl/fi/okf9cnzx6dd25rz0zphzt/clouds-on-the-world-2004459_1280-1.jpg?rlkey=ncbiyi1hk5nzitsk518jifgzf&st=f9uqrwr2&dl=1' },
        { id: 'cardinal_vibrant', name: 'Cardinal', url: 'https://dl.dropboxusercontent.com/scl/fi/11c32t53azibevdilpu8t/cardinal-1884283_1280.jpg?rlkey=lxm3wghvbeh8326vyvkx8uw2g&st=772p1etu&dl=1' },
        { id: 'american_flag_vibrant', name: 'American Flag', url: 'https://dl.dropboxusercontent.com/scl/fi/hpaf4uk37uwhllel5mssk/american-flag-5143161_1280.jpg?rlkey=eakgs2yl7xjdcw0kolhiotx1k&st=ujub593q&dl=1' },
        { id: 'horse_vibrant', name: 'Horse', url: 'https://dl.dropboxusercontent.com/scl/fi/ok670w7ailumzno2bhcug/horse-6616504_1280.jpg?rlkey=gahdb1v9g3nf7d3llbs8yj3y0&st=wtud7x70&dl=1' },
        { id: 'sea_vibrant', name: 'Sea', url: 'https://dl.dropboxusercontent.com/scl/fi/51p0v8qljdisus5x3911i/sea-7598498_1280.jpg?rlkey=apgnxk3x33vi8oonbqor3dj0u&st=6k6ab8cq&dl=1' },
        { id: 'ocean_sunset_vibrant', name: 'Ocean Sunset', url: 'https://dl.dropboxusercontent.com/scl/fi/zlxh84afz7wjd5fboupj6/dickenson-bay-4961295_1280.jpg?rlkey=2tyxvmeh3qolet0x1zqxa4fj5&st=sals7ijs&dl=1' },
        { id: 'sky_blue_flowers_vibrant', name: 'Sky Blue Flowers', url: 'https://dl.dropboxusercontent.com/scl/fi/n3tapdvuqn90sj2cae9mt/lone-5265194_1280.jpg?rlkey=hm789aq2g8a19cx93f0uqgpcu&st=guy6skku&dl=1' },
        { id: 'salmon_flowers_vibrant', name: 'Salmon Flowers', url: 'https://dl.dropboxusercontent.com/scl/fi/ym8o3giqz3ylou1ne9l53/rose-572757_1280.jpg?rlkey=hrzjb9u2s6foy02skoqtehs67&st=6ch3tyyf&dl=1' },
        { id: 'row_boat_vibrant', name: 'Row Boat', url: 'https://dl.dropboxusercontent.com/scl/fi/7el39y9e5fly4ktwf7kzq/beach-1845810_1280-1.jpg?rlkey=sobp8ojglyl26cr4iltbnmyie&st=sergdgps&dl=1' },
        { id: 'light_purple_flowers_vibrant', name: 'Light Purple Flowers', url: 'https://dl.dropboxusercontent.com/scl/fi/nltasr5d9dyc6uptn37yc/autumn-7504819_1280.jpg?rlkey=dcsabnra2ubh3lyz6jz4662jb&st=c7ymeo84&dl=1' },
        { id: 'rose_vibrant', name: 'Rose', url: 'https://dl.dropboxusercontent.com/scl/fi/cm0fvz8kxdyka2nej0qs4/red-rose-4205759_1280.jpg?rlkey=zsw4zeqjdk555dv0g29caryct&st=npddwjon&dl=1' },
        { id: 'flower_winter_vibrant', name: 'Flower Winter', url: 'https://dl.dropboxusercontent.com/scl/fi/1i6watbobdb51ynv93xdi/ai-generated-8405991_1280.jpg?rlkey=k6jvnyk4nivuuz25hjb2m92mi&st=1i9mj3uh&dl=1' },
        { id: 'pebbles_vibrant', name: 'Pebbles', url: 'https://dl.dropboxusercontent.com/scl/fi/8eo4tjelc7d3lztxaq8qi/ai-generated-8986875_1280.jpg?rlkey=68yxi05cwsuuwvztqhe3fkotb&st=ocdzcqpl&dl=1' },
        { id: 'purple_flowers_vibrant', name: 'Purple Flowers', url: 'https://dl.dropboxusercontent.com/scl/fi/7r7nz7sej3b5ljpv9g5ba/flowers-402094_1280.jpg?rlkey=hop6zu48bidraf47c6qfzkdv8&st=jib80f4l&dl=1' },
        { id: 'white_flowers_vibrant', name: 'White Flowers', url: 'https://dl.dropboxusercontent.com/scl/fi/05r6t8fwg108na0vlyzs2/flowers-4508568_1280.jpg?rlkey=tcz5ju65y4ofhia0wetv854zs&st=knk01j90&dl=1' },
        { id: 'heaven_vibrant', name: 'Heaven', url: 'https://dl.dropboxusercontent.com/scl/fi/9l7v5hoknlfnqgl351l6z/heaven-3395811_1280.jpg?rlkey=pqcnuhgkfbwy417z6zhf2h14a&st=r7h50p4k&dl=1' },
        { id: 'dandelion_vibrant', name: 'Dandelion', url: 'https://dl.dropboxusercontent.com/scl/fi/vlipy4syl2629ezp6c3br/dandelion-5030059_1280.jpg?rlkey=t8oekc1iroefbo8d56n01u54t&st=czzeomv3&dl=1' },
        { id: 'heart_rock_vibrant', name: 'Heart Rock', url: 'https://dl.dropboxusercontent.com/scl/fi/i8afcxrp6011lgmgrhyw0/valentines-day-9332179_1280.jpg?rlkey=hs60drus484w25fpapbjbvbc5&st=cg0nax5x&dl=1' },
        { id: 'blue_flowers_vibrant', name: 'Blue Flowers', url: 'https://dl.dropboxusercontent.com/scl/fi/o5e5ux8j7kaxbhw4tdak7/snow-shine-4053584_1280.jpg?rlkey=th1hp5rcstmgnnbv3d5qbn9mt&st=20wtf9s7&dl=1' },
        { id: 'cross_flower_vibrant', name: 'Cross Flower', url: 'https://dl.dropboxusercontent.com/scl/fi/aptbz34o8958flfzl14o1/cross-3768890_1280.jpg?rlkey=6f0d42cae36tgx9ham9iltbf1&st=mcioixzn&dl=1' },
        { id: 'heart_creek_vibrant', name: 'Heart Creek', url: 'https://dl.dropboxusercontent.com/scl/fi/ui7lsh3q5vfk4ytlm6czy/ai-generated-9396110_1280-1.jpg?rlkey=lbc8p3a0ncpu9xvb15b8d1lpd&st=awvck9kb&dl=1' },
        { id: 'bw_rose_vibrant', name: 'Black and White Rose', url: 'https://dl.dropboxusercontent.com/scl/fi/xy29fmfq987e1j2uzcfko/grief-1665772_1280.jpg?rlkey=99gcesplecf743bz9juohefbm&st=poucq7lx&dl=1' },
        { id: 'dove_vibrant', name: 'Dove', url: 'https://dl.dropboxusercontent.com/scl/fi/4m2vhtx2br5uwserry65y/dove-3426159_1280.jpg?rlkey=imavrsvac0wdeiag7whx1w7yy&st=3ozp50pk&dl=1' },
        { id: 'peach_blossums_vibrant', name: 'Peach Blossums', url: 'https://dl.dropboxusercontent.com/scl/fi/qgudit5a12dx4mp00ntig/peach-tree-4087197_1280.jpg?rlkey=wfi71dthx25600850ffxx7gu9&st=wwu5m93g&dl=1' },
        { id: 'moon_coast_vibrant', name: 'Moon Coast', url: 'https://dl.dropboxusercontent.com/scl/fi/cp5acha4hm4qzfwhbcszu/beach-8109200_1280.jpg?rlkey=d15ch3uolo3fhwjt0eg0plin3&st=8hytziay&dl=1' },
        { id: 'love_vibrant', name: 'Love', url: 'https://dl.dropboxusercontent.com/scl/fi/gk2bgt4wqo5w9kl3veedl/flower-3388626_1280.jpg?rlkey=xaw6dgkb220q5tr7nbphya56s&st=sb0aqwhe&dl=1' },
        { id: 'cross_horizon_vibrant', name: 'Cross Horizon', url: 'https://dl.dropboxusercontent.com/scl/fi/d9c2v6m6svz0cvphzo164/cross-4062996_1280.jpg?rlkey=on4p9bisfgs1zsxs36z1z1wh0&st=yylcg7mv&dl=1' },
        { id: 'rainbow_vibrant', name: 'Rainbow', url: 'https://dl.dropboxusercontent.com/scl/fi/2wk9tfbc7hfe687tovhlq/sunset-2593892_1280.jpg?rlkey=kgzhigax5djqsx1nmjv12d4hq&st=k84gl9zq&dl=1' }
    ]
};

// Candle URLs for title and end slides
const TITLE_CANDLES = {
    blue: 'https://dl.dropboxusercontent.com/scl/fi/nv1f80trndu7nzisi1q2x/Title-candle-blue.jpg?rlkey=yzh1fiis9fy8uod3w6694r51m&st=wi5xkr4p',
    gray: 'https://dl.dropboxusercontent.com/scl/fi/i1ht1q3iidfa8oh0zwfhx/Title-candle-gray.jpg?rlkey=f0cknlpy1p4xqjc45ykozneuy&st=ez0qv1p9',
    multi: 'https://dl.dropboxusercontent.com/scl/fi/p2c670buipua07hm60crp/Title-candle-multi.jpg?rlkey=84iw6d5gqevv3lhdw5p6az0ap&st=2js4nwg5'
};

const END_CANDLES = {
    blue: 'https://dl.dropboxusercontent.com/scl/fi/wq5k96hlo3j4e7tc0tqo3/Closing-candle-blue.jpg?rlkey=37m0mrpjubumh8mx8lwodgdqf&st=5xqyem1d',
    gray: 'https://dl.dropboxusercontent.com/scl/fi/lwed5r5lszojhvtdg6wyy/Closing-candle-gray.jpg?rlkey=704mawxq9kiahxqav0m389i6k&st=frgdb4dl',
    multi: 'https://dl.dropboxusercontent.com/scl/fi/y9fwoeswyugtd1zk5l2zu/Closing-candle-multi.jpg?rlkey=9lmpm1ww32vn292aft0atmk58&st=nxhg7w44'
};

// State management
let selectedTheme = null;
let selectedTemplate = null;
let customBackgroundFile = null;
let currentSlideIndex = 0;

// Carousel navigation functions (global scope for onclick handlers)
window.changeSlide = function(direction) {
    const slides = document.querySelectorAll('.preview-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Remove active class
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    
    // Calculate new index
    currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;
    
    // Add active class
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
};

window.goToSlide = function(index) {
    const slides = document.querySelectorAll('.preview-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Remove active class
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    
    // Set new index
    currentSlideIndex = index;
    
    // Add active class
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
};

window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const uid = urlParams.get('uid');
    const name = urlParams.get('name');
    const type = urlParams.get('type');
    const email = urlParams.get('email');

    // Fill hidden fields
    document.getElementById('uid').value = uid || '';
    document.getElementById('urlName').value = name || '';
    document.getElementById('type').value = type || '';
    document.getElementById('email').value = email || '';

    // ✅ ALWAYS attach submit listener regardless of order type
    const form = document.getElementById('slideshowForm');
    form.addEventListener('submit', handleSubmit);

    // Check if File_Only type - show simplified form
    if (type && type.toLowerCase().includes('file')) {
        showFileOnlyForm();
        return;
    }

    // Initialize form handlers (for slideshow orders only)
    initializeForm();
});

function initializeForm() {
    // Age calculation
    const birthdateInput = document.getElementById('birthdate');
    const deathdateInput = document.getElementById('deathdate');

    birthdateInput.addEventListener('change', calculateAge);
    deathdateInput.addEventListener('change', calculateAge);

    // Background type selection
    const backgroundRadios = document.querySelectorAll('input[name="backgroundType"]');
    backgroundRadios.forEach(radio => {
        radio.addEventListener('change', handleBackgroundTypeChange);
    });

    // Theme tabs
    const themeTabs = document.querySelectorAll('.theme-tab');
    themeTabs.forEach(tab => {
        tab.addEventListener('click', handleThemeChange);
    });

    // Custom upload
    const customUpload = document.getElementById('customBackground');
    customUpload.addEventListener('change', handleCustomUpload);
}

function showFileOnlyForm() {
    console.log('File_Only order detected - showing simplified form');
    
    // Hide all the slideshow customization sections
    const backgroundSection = document.getElementById('backgroundSection');
    const borderSection = document.getElementById('borderSection');
    const formatSection = document.getElementById('formatSection');
    
    if (backgroundSection) backgroundSection.style.display = 'none';
    if (borderSection) borderSection.style.display = 'none';
    if (formatSection) formatSection.style.display = 'none';
    
    // Update page title
    const pageTitle = document.querySelector('h1');
    if (pageTitle) {
        pageTitle.textContent = 'Complete Your File Organization Order';
    }
    
    // Update intro text
    const introText = document.querySelector('.intro-text');
    if (introText) {
        introText.textContent = 'Please provide the following information to help us organize your photos chronologically.';
    }
    
    // Make background/border/format fields not required
    document.querySelectorAll('input[name="backgroundType"]').forEach(input => {
        input.removeAttribute('required');
    });
    document.querySelectorAll('input[name="border"]').forEach(input => {
        input.removeAttribute('required');
    });
    document.querySelectorAll('input[name="format"]').forEach(input => {
        input.removeAttribute('required');
    });
    
    // Update submit button text
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        const btnText = submitBtn.querySelector('.btn-text');
        if (btnText) btnText.textContent = 'Complete Order';
    }
}

function calculateAge() {
    const birthdate = document.getElementById('birthdate').value;
    const deathdate = document.getElementById('deathdate').value;

    if (!birthdate || !deathdate) {
        document.getElementById('ageDisplay').style.display = 'none';
        return;
    }

    const birth = new Date(birthdate);
    const death = new Date(deathdate);

    if (death < birth) {
        document.getElementById('ageDisplay').style.display = 'none';
        showError('Date of passing must be after birthdate');
        return;
    }

    let age = death.getFullYear() - birth.getFullYear();
    const monthDiff = death.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && death.getDate() < birth.getDate())) {
        age--;
    }

    document.getElementById('calculatedAge').textContent = `${age} years`;
    document.getElementById('ageDisplay').style.display = 'block';
    hideError();
}

function handleBackgroundTypeChange(e) {
    const templateSection = document.getElementById('templateSection');
    const customSection = document.getElementById('customUploadSection');

    if (e.target.value === 'template') {
        templateSection.style.display = 'block';
        customSection.style.display = 'none';
        document.getElementById('customBackground').removeAttribute('required');
    } else {
        templateSection.style.display = 'none';
        customSection.style.display = 'block';
        document.getElementById('customBackground').setAttribute('required', 'required');
    }
}

function handleThemeChange(e) {
    const theme = e.target.dataset.theme;
    selectedTheme = theme;
    selectedTemplate = null;

    // Update active tab
    document.querySelectorAll('.theme-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    e.target.classList.add('active');

    // Load templates for this theme
    loadTemplates(theme);
}

function loadTemplates(theme) {
    const gallery = document.getElementById('templateGallery');
    gallery.innerHTML = '';

    const templates = TEMPLATES[theme];
    templates.forEach(template => {
        const item = document.createElement('div');
        item.className = 'template-item';
        item.dataset.templateId = template.id;
        item.dataset.templateUrl = template.url;

        item.innerHTML = `
            <img src="${template.url}" alt="${template.name}">
            <div class="template-name">${template.name}</div>
            <div class="checkmark">✓</div>
        `;

        item.addEventListener('click', () => selectTemplate(item, template));
        gallery.appendChild(item);
    });
}

function selectTemplate(item, template) {
    // Remove previous selection
    document.querySelectorAll('.template-item').forEach(t => {
        t.classList.remove('selected');
    });

    // Select new template
    item.classList.add('selected');
    selectedTemplate = template;
    
    // Show preview for this template
    generateTemplatePreview(template);
}

function generateTemplatePreview(template) {
    // Reset to first slide
    currentSlideIndex = 0;
    
    // Complete slide design images
    const completeTitleSlide = 'https://dl.dropboxusercontent.com/scl/fi/veiuv1adp575icictjrmj/Your-paragraph-text-1.png?rlkey=w4wrzkn85q290py82r7z3kz7j&st=byhh9k8d&dl=1';
    const completeEndSlide = 'https://dl.dropboxusercontent.com/scl/fi/vym9bqjnb036c17kcijoj/Your-paragraph-text-2.png?rlkey=1bn5we5dnswfal1vpuvpblcsf&st=3gb48nlq&dl=1';
    
    // Sample photo for middle slide
    const samplePhotos = [
        'https://dl.dropboxusercontent.com/scl/fi/muk80km89bxo4u823gcad/DSC_0701.JPG?rlkey=4993te66b9xg6xy7mz69md2d2&st=25gczbgp&dl=1',
        'https://dl.dropboxusercontent.com/scl/fi/8t2slrauqqr8poib5ekbt/DSC_0333.JPG?rlkey=d2v17cupbgk5prodeyftskfdg&st=h6pwi9e9&dl=1',
        'https://dl.dropboxusercontent.com/scl/fi/7v625luwbb2ch2h5u6zi3/200-s_Eureka-Springs_0002.jpg?rlkey=ff5z6rpteujr71a4r5jvg9b49&st=6zbovd9r&dl=1'
    ];
    const randomPhoto = samplePhotos[Math.floor(Math.random() * samplePhotos.length)];
    
    // Update preview slides
    const previewSlides = document.querySelectorAll('.preview-slide');
    
    // 🔥 KEY CHANGE: Vibrant theme = all 3 slides use the same Vibrant background (like custom)
    if (selectedTheme === 'vibrant') {
        // Title slide - complete design on VIBRANT background
        previewSlides[0].style.backgroundImage = `url(${template.url})`;
        previewSlides[0].innerHTML = `
            <img src="${completeTitleSlide}" alt="Title Slide" style="width: 100%; height: 100%; object-fit: contain;">
        `;
        
        // Photo slide - sample photo on VIBRANT background
        previewSlides[1].style.backgroundImage = `url(${template.url})`;
        previewSlides[1].innerHTML = `
            <div class="preview-photo-container">
                <img src="${randomPhoto}" class="preview-sample-photo" alt="Sample Photo">
            </div>
        `;
        
        // End slide - complete design on VIBRANT background
        previewSlides[2].style.backgroundImage = `url(${template.url})`;
        previewSlides[2].innerHTML = `
            <img src="${completeEndSlide}" alt="End Slide" style="width: 100%; height: 100%; object-fit: contain;">
        `;
    } else {
        // Blue/Gray/Multi - use candle backgrounds for title/end
        const titleCandleUrl = TITLE_CANDLES[selectedTheme];
        const endCandleUrl = END_CANDLES[selectedTheme];
        
        // Title slide - complete Canva design on CANDLE background
        previewSlides[0].style.backgroundImage = `url(${titleCandleUrl})`;
        previewSlides[0].innerHTML = `
            <img src="${completeTitleSlide}" alt="Title Slide" style="width: 100%; height: 100%; object-fit: contain;">
        `;
        
        // Photo slide - sample photo on TEMPLATE background
        previewSlides[1].style.backgroundImage = `url(${template.url})`;
        previewSlides[1].innerHTML = `
            <div class="preview-photo-container">
                <img src="${randomPhoto}" class="preview-sample-photo" alt="Sample Photo">
            </div>
        `;
        
        // End slide - complete Canva design on CANDLE background
        previewSlides[2].style.backgroundImage = `url(${endCandleUrl})`;
        previewSlides[2].innerHTML = `
            <img src="${completeEndSlide}" alt="End Slide" style="width: 100%; height: 100%; object-fit: contain;">
        `;
    }
    
    // Show preview
    document.getElementById('previewCarousel').style.display = 'block';
}

function handleCustomUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    if (file.size > 10 * 1024 * 1024) {
        showError('File size must be under 10MB');
        e.target.value = '';
        return;
    }

    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        showError('Only JPG and PNG files are allowed');
        e.target.value = '';
        return;
    }

    customBackgroundFile = file;

    // Show carousel preview with realistic slide mockups
    const reader = new FileReader();
    reader.onload = function(event) {
        const bgUrl = event.target.result;
        
        // Reset to first slide
        currentSlideIndex = 0;
        
        // Sample photo for middle slide
        const samplePhotos = [
            'https://dl.dropboxusercontent.com/scl/fi/muk80km89bxo4u823gcad/DSC_0701.JPG?rlkey=4993te66b9xg6xy7mz69md2d2&st=25gczbgp&dl=1',
            'https://dl.dropboxusercontent.com/scl/fi/8t2slrauqqr8poib5ekbt/DSC_0333.JPG?rlkey=d2v17cupbgk5prodeyftskfdg&st=h6pwi9e9&dl=1',
            'https://dl.dropboxusercontent.com/scl/fi/7v625luwbb2ch2h5u6zi3/200-s_Eureka-Springs_0002.jpg?rlkey=ff5z6rpteujr71a4r5jvg9b49&st=6zbovd9r&dl=1'
        ];
        const randomPhoto = samplePhotos[Math.floor(Math.random() * samplePhotos.length)];
        
        // Complete slide design images
        const completeTitleSlide = 'https://dl.dropboxusercontent.com/scl/fi/veiuv1adp575icictjrmj/Your-paragraph-text-1.png?rlkey=w4wrzkn85q290py82r7z3kz7j&st=byhh9k8d&dl=1';
        const completeEndSlide = 'https://dl.dropboxusercontent.com/scl/fi/vym9bqjnb036c17kcijoj/Your-paragraph-text-2.png?rlkey=1bn5we5dnswfal1vpuvpblcsf&st=3gb48nlq&dl=1';
        
        // Update preview slides
        const previewSlides = document.querySelectorAll('.preview-slide');
        
        // Title slide - complete Canva design
        previewSlides[0].style.backgroundImage = `url(${bgUrl})`;
        previewSlides[0].innerHTML = `
            <img src="${completeTitleSlide}" alt="Title Slide" style="width: 100%; height: 100%; object-fit: contain;">
        `;
        
        // Photo slide (centered photo with NO border on custom background)
        previewSlides[1].style.backgroundImage = `url(${bgUrl})`;
        previewSlides[1].innerHTML = `
            <div class="preview-photo-container">
                <img src="${randomPhoto}" class="preview-sample-photo" alt="Sample Photo">
            </div>
        `;
        
        // End slide - complete Canva design
        previewSlides[2].style.backgroundImage = `url(${bgUrl})`;
        previewSlides[2].innerHTML = `
            <img src="${completeEndSlide}" alt="End Slide" style="width: 100%; height: 100%; object-fit: contain;">
        `;
        
        // Show preview
        document.getElementById('previewCarousel').style.display = 'block';
    };
    reader.readAsDataURL(file);

    hideError();
}

async function handleSubmit(e) {
    e.preventDefault();

    // Validate form
    const validation = validateForm();
    if (!validation.valid) {
        showError(validation.message);
        return;
    }

    // Disable submit button
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').style.display = 'none';
    submitBtn.querySelector('.btn-loader').style.display = 'inline';

    try {
        // Prepare submission data
        const formData = await prepareFormData();

        // Submit to Zapier webhook
        const response = await submitToBackend(formData);

        // Redirect to thank you page
        window.location.href = `thank-you.html?uid=${formData.uid}&name=${encodeURIComponent(formData.deceased_full_name)}`;
    } catch (error) {
        showError('Submission failed. Please try again.');
        console.error('Submission error:', error);
        
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').style.display = 'inline';
        submitBtn.querySelector('.btn-loader').style.display = 'none';
    }
}

function validateForm() {
    const type = document.getElementById('type').value;
    
    // File_Only orders don't need background/border/format validation
    if (type && type.toLowerCase().includes('file')) {
        // Just check that dates are filled
        const birthdate = document.getElementById('birthdate').value;
        const deathdate = document.getElementById('deathdate').value;
        
        if (!birthdate) {
            return { valid: false, message: 'Please enter the birthdate' };
        }
        if (!deathdate) {
            return { valid: false, message: 'Please enter the date of passing' };
        }
        
        return { valid: true };
    }
    
    // Original validation for slideshow orders
    const backgroundType = document.querySelector('input[name="backgroundType"]:checked');
    if (!backgroundType) {
        return { valid: false, message: 'Please select a background option' };
    }

    if (backgroundType.value === 'template') {
        if (!selectedTheme) {
            return { valid: false, message: 'Please select a theme color' };
        }
        if (!selectedTemplate) {
            return { valid: false, message: 'Please select a template' };
        }
    } else {
        if (!customBackgroundFile) {
            return { valid: false, message: 'Please upload a background image' };
        }
    }

    // Check border selection
    const border = document.querySelector('input[name="border"]:checked');
    if (!border) {
        return { valid: false, message: 'Please select a border style' };
    }

    // Check format
    const format = document.querySelector('input[name="format"]:checked');
    if (!format) {
        return { valid: false, message: 'Please select a slideshow format' };
    }

    return { valid: true };
}

async function prepareFormData() {
    const uid = document.getElementById('uid').value;
    const urlName = document.getElementById('urlName').value;
    const type = document.getElementById('type').value;
    const email = document.getElementById('email').value;
    
    // Combine customer name
    const customerFirstName = document.getElementById('customerFirstName').value;
    const customerLastName = document.getElementById('customerLastName').value;
    const customerName = `${customerFirstName} ${customerLastName}`;
    
    // Combine deceased name
    const deceasedFirstName = document.getElementById('deceasedFirstName').value;
    const deceasedMiddleName = document.getElementById('deceasedMiddleName').value;
    const deceasedLastName = document.getElementById('deceasedLastName').value;
    const deceasedName = deceasedMiddleName 
        ? `${deceasedFirstName} ${deceasedMiddleName} ${deceasedLastName}`
        : `${deceasedFirstName} ${deceasedLastName}`;
    
    const birthdate = document.getElementById('birthdate').value;
    const deathdate = document.getElementById('deathdate').value;

    const data = {
        uid,
        name: urlName,
        type,
        email,
        customer_name: customerName,
        customer_first_name: customerFirstName,
        customer_last_name: customerLastName,
        deceased_full_name: deceasedName,
        deceased_first_name: deceasedFirstName,
        deceased_middle_name: deceasedMiddleName,
        deceased_last_name: deceasedLastName,
        birthdate,
        deathdate
    };

    // Only add slideshow fields if NOT File_Only
    if (!type || !type.toLowerCase().includes('file')) {
        const format = document.querySelector('input[name="format"]:checked').value;
        const backgroundType = document.querySelector('input[name="backgroundType"]:checked').value;
        const border = document.querySelector('input[name="border"]:checked').value;

        data.format_choice = format;
        data.border_color = border;

        // 🔥 KEY CHANGE: Vibrant theme is treated as CUSTOM for backend
        if (backgroundType === 'template') {
            if (selectedTheme === 'vibrant') {
                // Treat Vibrant as custom background
                data.background_type = 'custom';
                data.background_url = selectedTemplate.url;
                data.vibrant_template_name = selectedTemplate.name;
                data.vibrant_template_id = selectedTemplate.id;
                data.theme_color = null;
                data.selected_template = null;
                data.bg_source = null;
                data.background_template = null;
                data.title_background_url = null;
                data.end_background_url = null;
                data.custom_background_file = null;
                data.custom_background_filename = null;
            } else {
                // Normal template (blue/gray/multi)
                data.background_type = 'template';
                data.theme_color = selectedTheme;
                data.selected_template = selectedTemplate.id;
                data.bg_source = selectedTemplate.url;
                data.background_template = selectedTemplate.id;
                data.background_url = selectedTemplate.url;
                data.title_background_url = TITLE_CANDLES[selectedTheme];
                data.end_background_url = END_CANDLES[selectedTheme];
                data.custom_background_file = null;
                data.custom_background_filename = null;
            }
        } else {
            // User uploaded custom file
            data.background_type = 'custom';
            data.custom_background_file = customBackgroundFile;
            data.custom_background_filename = customBackgroundFile.name;
            data.theme_color = null;
            data.selected_template = null;
            data.bg_source = null;
            data.background_template = null;
            data.background_url = null;
            data.title_background_url = null;
            data.end_background_url = null;
        }
    }

    return data;
}

async function submitToBackend(formData) {
    console.log('📤 Submitting to backend');
    
    try {
        // If custom background, upload to Dropbox first
        if (formData.background_type === 'custom' && formData.custom_background_file) {
            console.log('📦 Uploading custom background to Dropbox...');
            
            const dropboxPath = `/custom_backgrounds/${formData.uid}/custom_bg_${formData.uid}.jpg`;
            
            // Get Dropbox access token using refresh token
            const tokenResponse = await fetch('https://api.dropbox.com/oauth2/token', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `grant_type=refresh_token&refresh_token=XMsyY4EhACoAAAAAAAAAAYFyGD6-Q89Uxb9weu172SRXCtjYpmr-ab70WUQ4gKIg&client_id=jh1j38ik7vnso5y&client_secret=5qbw5lcm2w6nmvx`
            });
            
            const tokenData = await tokenResponse.json();
            const accessToken = tokenData.access_token;
            
            // Upload file to Dropbox
            const uploadResponse = await fetch('https://content.dropboxapi.com/2/files/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/octet-stream',
                    'Dropbox-API-Arg': JSON.stringify({
                        path: dropboxPath,
                        mode: 'overwrite'
                    })
                },
                body: formData.custom_background_file
            });
            
            if (!uploadResponse.ok) {
                throw new Error('Dropbox upload failed');
            }
            
            console.log('✅ Uploaded to Dropbox:', dropboxPath);
            
            // Remove file from formData, add Dropbox path
            delete formData.custom_background_file;
            formData.custom_background_dropbox_path = dropboxPath;
        }
        
        // Send metadata to Zapier (JSON only, no file)
        const response = await fetch(ZAPIER_WEBHOOK_URL, {
            method: 'POST',
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error(`Zapier webhook failed with status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('✅ Zapier response:', result);
        
        return result;
    } catch (error) {
        console.error('❌ Submission error:', error);
        throw error;
    }
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideError() {
    document.getElementById('errorMessage').style.display = 'none';
}
