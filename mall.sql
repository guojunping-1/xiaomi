/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 8.0.12 : Database - mall
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`mall` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `mall`;

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(100) NOT NULL,
  `ontherName` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

/*Data for the table `category` */

insert  into `category`(`id`,`categoryName`,`ontherName`) values (1,'路由器','智能'),(2,'电视机','盒子'),(3,'智能硬件','插线板'),(4,'红米手机','智能手机'),(5,'笔记本','平板'),(6,'小米手机','电话卡'),(37,'出行','穿戴'),(38,'电源','配件'),(39,'健康','儿童'),(40,'耳机','音响'),(41,'生活','箱包');

/*Table structure for table `good` */

DROP TABLE IF EXISTS `good`;

CREATE TABLE `good` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `des` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `categoryId` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=165 DEFAULT CHARSET=utf8;

/*Data for the table `good` */

insert  into `good`(`id`,`title`,`des`,`categoryId`) values (1,'小米手机充电器','支持45W快速充电，mi8原装充电器，采用钛合金材料打造，在省电的同时大大提高了充电的传输效率','3'),(6,'小米MIX 3','DxOMark拍照108分 / 磁动力滑盖全面屏 / 四曲面陶瓷机身 / 骁龙845旗舰处理器 / 包装盒内附赠10W无线充电器','6'),(8,'小米笔记本Pro 15.6','全新第十代英特尔® 酷睿™ i7／i5 处理器\n升级版NVIDIA® GeForce® MX250 独立显卡','5'),(84,'小米9 Pro','拥有超快的骁龙855 Plus，包括 30W 无线闪充在内的三重快充，还有用超强振感的横向线性马达、超高色准的专业屏幕以及众多强大配置。\n','6'),(93,'小米笔记本Air 13.3″ 2019款','高性能轻薄笔记本\n设计制图、运行大型 3D 游戏，复杂任务也可以轻松驾驭。\n配置第八代酷睿四核 i7 处理器 / i5处理器','5'),(94,'Redmi 红米电视 70英寸','70英寸大屏4K+HDR大腔体发声单元内置小爱同学PatchWall轻松投屏K歌娱乐2GB+16GB大存储','2'),(96,'小米电视4C 32英寸','人工智能系统\n高清液晶屏\n64位处理器\n海量影视内容\n立体声扬声器\n1GB+4GB 内存','2'),(103,'米家石英表','计步抬腕可见\n自动校准时间\n智能振动提醒\n日常生活防水\n不锈钢表壳，三色可选','37'),(102,'小米路由器 Pro','全新一代智能家庭中心\n全新金属机身设计 / AC2600双频 / 4x4全向性天线 / 802.11ac wave2 / 支持MU-MIMO','1'),(101,'Redmi 8A','充电宝级大电量\n31天超长续航\n日常使用3天一充','4'),(99,'小米小爱老师','小爱老师口袋外教 丰富内容趣味学习 查单词巨快 背单词巨牢 出国游巨方便  说英语巨地道','3'),(100,'小米米家智能门锁','直插式 C 级智能锁芯*\n锁芯贯穿锁体更安全\n一体化 3D 半导体指纹\n瑞典金融级检测算法\n6 大开锁方式\n指纹、密码（长期、临时、一次性）、NFC等*\n超 16 项安全黑科技\n门锁全面防技术与暴力破解\n\n7 大安全检测*\n内置智能传感器，门锁状态全检测，异常报警\n完善电磁防护设计\n抵御小黑盒攻击*\n米家安全芯片\n蓝牙通讯内容全加密\n丰富的智能联动\n回家，开门就自动开灯*','3'),(104,'小米USB-C数据线 编织线版','高强度纤维编制线体 / 一体化接口设计 / 结实耐用','38'),(105,'米兔拉杆箱','坚固小巧 / 创新收纳分区 / 顺滑静音万向轮 / 赠 DIY 贴纸','39'),(106,'小米小爱音箱 Pro','750mL超大音腔容积 / AUX IN 支持有线连接 / 组合立体声 / 专业级DTS音效 / Hi-Fi级音频芯片 / 支持红外遥控传统家电 / 蓝牙Mesh网关','40'),(109,'Redmi 8','\n高通骁龙439八核处理器\n最高主频 2.0GHz\nAdrenoTM 图形处理器，最高主频 650 MHz\n\n\n4GB+64GB*\n最高可选\n3GB+32GB / 4GB+64GB\n支持高达 512GB 的可扩展存储\n*实际可用容量会由于诸多因素而减少并有所差异：由于操作系统运行占据了部分运行内存（RAM），实际可用空间小于标识内存容量；由于安装操作系统和预装的程序占据了部分机身存储闪存（ROM），实际可用存储空间小于标识闪存容量。','4'),(108,'自动折叠伞','防泼水伞布 / 高效遮阳防晒 / 一键自动开合 / 安全防反弹结构​','41'),(110,'Redmi Note 8 Pro','2000万AI美颜相机','4'),(111,'Redmi Note 8','高通骁龙665八核处理器，最高主频 2.0GHz，AdrenoTM 610图形处理器，高通第三代AIE人工智能引擎','4'),(112,'红米Note 7','4800 万拍照千元机\n18 个月超长质保','4'),(113,'Redmi 7','续航小霸王，Redmi 红米7，18天超长续航* 18个月超长质保','6'),(114,'Redmi 7A','红米7A，小巧大电量，持久又流畅','4'),(115,'小米MIX Alpha','MIX Alpha 是小米站在 5G时代的起点，设计的一款面向未来的概念手机。','6'),(116,'小米全面屏电视E55A','全面屏设计内置小爱同学4K + HDR杜比 + DTSPatchWall海量内容2GB + 8GB大存储64位四核处理器','2'),(117,'小米全面屏电视E65A','人工智能语音系统海量影视内容4K 超高清屏杜比音效64位四核处理器2GB + 8GB大存储','2'),(118,'小米电视4X 43英寸','人工智能语音系统 FHD全高清屏 64位四核处理器 海量片源 1GB+8GB大内存 钢琴烤漆','2'),(119,'小米电视4C 55英寸','\n人工智能 大内存 杜比音效 超窄边 4K HDR 海量片源 纤薄机身 钢琴烤漆','2'),(120,'小米电视4A 65英寸','老人小孩都会用的人工智能语音电视','2'),(121,'小米壁画电视 65英寸','65英寸全场景AI语音艺术电视 大屏智能生活控制中心','2'),(122,'米家智能门锁 推拉式 通用版','适用于标准锁体和霸王锁体 / 直插式C级锁芯 / 6种开锁方式 / 7重安全状态检测 / 抵御小黑盒攻击 / 智能联动','3'),(123,'小米小爱音箱 Play版','结束了一天工作回到家，小爱已乖乖在家等候召唤。只要你一句话，小爱就可以打开电视播放你喜欢的节目，还能让扫地机器人清扫房间|你还可以在睡前吩咐她明天早上准时叫你起床。现在，你可以找到更酷的生活方式，小爱将陆续联动更多新鲜有趣的智能产品，帮你打造一个智能温馨的家。','3'),(124,'小爱音箱 万能遥控版','传统家电秒变智能','3'),(125,'米家电饭煲4L','4L大容量 / 智能加热曲线 / 2.0mm 厚质锅胆 / 大金PFA粉体涂层 / 890W动态功率 / 双感温探头 / 24小时智能远程预约','3'),(126,'小米手环4','改变从今开始 彩屏心率运动手环','3'),(127,'米家九号平衡轮','双脚分离式设计 / 三步轻松上手 / 无需穿脱，踩上就走 / 便携提手，拎着方便','3'),(128,'小米体脂秤2','G字型传感器 / 高精准BIA芯片 / 13项身体数据 / 平衡能力测试','3'),(129,'小米米家电动滑板车Pro','多功能控制面板 / 45 公里续航 / 6倍步行速度','3'),(130,'小米真无线蓝牙耳机 Air 2','智能语音唤醒，解放双手 / 蓝牙5.0芯片，稳定无线连接 / 分体式真无线设计，无主从限制，单双耳灵活切换 / 双麦克风降噪，有效降低通话时环境噪音 / LHDC蓝牙解码高清音质 / 复合振膜动圈，还原声音细节','40'),(131,'高速无线充套装','快速无线闪充 / 独立静音风扇 / Qi充电标准 / 安全充电','38'),(132,'Redmi充电宝 10000mAh 标准版 白色','10000mAh大电量 / 可上飞机 / 双输入接口(USB-C&Micro-USB) / 双输出接口(2xUSB-A) / 高密度锂聚合物电芯','38'),(133,'Redmi充电宝 20000mAh 快充版','20000mAh大电量 / 可上飞机 / 双输入接口(USB-C&Micro-USB) / 双输出接口(2xUSB-A) / 双向18W快充','38'),(134,'小米插线板 5孔位','过载断电保护 / 独立安全门 / 高温阻燃','38'),(135,'小米蓝牙耳机AirDots青春版','雅致简约 / 分体式耳机 / 收纳充电盒 / 蓝牙5.0 / 触控操作\n\n','40'),(136,'小米降噪项圈蓝牙耳机','Hybrid 混合数字降噪，强力消噪 / 支持Sony LDAC，高清音质 / 最长20小时长续航，持久聆听 / 动圈+动铁双单元，三频均衡','40'),(137,'小米蓝牙耳机青春版','支持切歌 | 音量调节 | 6.5克轻巧 | 蓝牙4.1高清通话音质','40'),(138,'小米路由器4A千兆版','双核CPU千兆网口 ／ 双频AC1200 ／ 高增益4天线 ／ 128MB大内存 ／ 安全防蹭网 ／ 儿童安全上网 ／ 专为小米智能家居优化','1'),(139,'小米路由器4','覆盖广，信号强 ／ 智能设备，轻松入网 ／ 802.11n+ac双频并发 ／ 超大Flash，支持丰富功能 ／ 双核处理器，更快更稳定','1'),(140,'27W高速充电插头','快速高效 / 安全稳定 / 兼容性强 / 充电地域不受限制 / 外形简约','1'),(141,'小米USB充电器30W快充版（1A1C）','双口输出 / 30W 输出 / 可折叠插脚 / 小巧便携','1'),(142,'小米USB-C数据线 编织线版','高强度纤维编制线体 / 一体化接口设计 / 结实耐用','1'),(143,'ZMI USB Type-C 转 Lightning 数据线','MFi官方认证，支持iPhone全系列，3A大流量，速度飙升，苹果原装C94端子头','1'),(144,'米家LED随身灯','5级亮度调节 / 亮度提升50% / 小巧轻便 / 可弯曲，适合多种使用场景',NULL),(145,'小米9 Pro 5G 极简摩纹保护壳','素面与摩纹拼接，打造时尚魅力 / 优质环保材质，耐用不易变形 / 裸机般顺滑手感，细腻舒适 / 独立按键，按压舒适，回弹灵活 / 全面贴合，边缘光滑','1'),(146,'米家自动洗手机套装','伸手出泡，抑菌有效 |免接触更卫生|99.9% 有效抑菌|植物精华，滋润舒适','1'),(147,'Redmi K20 / K20 Pro 怪力魔王保护壳','优选PC材料，强韧张力，经久耐用 / 精选开孔，全面贴合机身 / 手感轻薄细腻，舒适无负担 / 三款颜色可选，彰显个性，与众不同','1'),(148,'米家保温杯2','316L不锈钢材质内胆 / 超轻旋薄内胆 / 长效保温保冷 / 480ml大容量','41'),(149,'小米小背包','4 级防泼水 / 10L容量 / 轻盈背负 / YKK 拉链','37'),(150,'米家飞行员太阳镜 Pro','阻隔紫外线防眩光 / 1mm 超细镜腿 / 不锈钢超薄镜架 / 免螺丝一体结构','41'),(151,'小米巨能写中性笔10支装','4倍书写长度 / 日本MIKUNI油墨 / 0.5mm弹簧子弹头 / 不易飞白断墨','41'),(152,'小米旅行箱 20英寸 布朗熊限量版','“国际巨星” LINE FRIENDS布朗熊／拉上他回头率飙升／坚韧轻巧 / 科思创PC材质 / 万向静音轮','37'),(153,'米家迷你保温杯','小巧便携 / 保温锁冷 / 轻量杯身 / 多彩四色 / 350ml容量','41'),(154,'米家驱蚊器基础版 3个装','超划算3个装 / 长效驱蚊 / 室内自由摆放 / 无加热设计 / 一键定时','41'),(155,'米家车载空气净化器（USB车充版）','双风机循环气流，高效净化车内空气 过滤 PM2.5 颗粒物|60m³/h 颗粒物 CADR 静音模式|双轮镜像风机','37'),(156,'米家车载空净除甲醛滤芯','触媒活性炭滤网 / 吸附甲醛 / 过滤有害气体 / 祛除异味','37'),(157,'小米米家后视镜行车记录仪','语音控制 ／ 5英寸IPS大屏 ／ 停车监控 ／ 前后双录','37'),(158,'米家电动剃须刀 往复双刀头','超薄便携 / 往复双刀头 / 全身水洗 / 超强续航','39'),(159,'米家电动剃须刀','双环刀网，双层刀片丨 双挡模式，快速剃须丨 干湿双剃，IPX7 级全身防水','39'),(160,'米兔折叠婴儿推车','单手秒收 / 登机免托运 / 四轮独立减震 / 坐躺随心','39'),(161,'米兔智能故事机','海量好故事|微信远程互动|智能语音交互|材质安全耐用','39'),(162,'工程挖掘机','造型炫酷，仿真车型，还原真实功能 / 履带式行进，应对多种复杂地形 / 还原科学机械传动原理 / 高精度零件，舒适拼插手感','39'),(163,'小米游戏本 2019款','处理器与显卡双双升级，搭配144Hz高刷新率全高清屏幕|\n让你在游戏世界恣意闯荡，亦可更加专注极致地创作','5'),(164,'RedmiBook 14 ','高性能独显轻薄本','5');

/*Table structure for table `goodimg` */

DROP TABLE IF EXISTS `goodimg`;

CREATE TABLE `goodimg` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `goodId` int(30) NOT NULL,
  `imgSrc` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `goodimg` */

insert  into `goodimg`(`id`,`goodId`,`imgSrc`) values (1,1,'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1569558304.27718807.jpg'),(2,1,'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1569557730.79449791.jpg');

/*Table structure for table `goodversion` */

DROP TABLE IF EXISTS `goodversion`;

CREATE TABLE `goodversion` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `goodId` int(30) NOT NULL,
  `price` varchar(255) NOT NULL,
  `inventory` int(30) DEFAULT NULL,
  `preferential` varchar(255) DEFAULT NULL,
  `imgSrc` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `categoryId` int(30) DEFAULT NULL,
  `carousel` varchar(30) DEFAULT NULL,
  `hot` int(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=121 DEFAULT CHARSET=utf8;

/*Data for the table `goodversion` */

insert  into `goodversion`(`id`,`goodId`,`price`,`inventory`,`preferential`,`imgSrc`,`category`,`categoryId`,`carousel`,`hot`) values (1,1,'299',666,'买三个送小米手环一个','http://localhost:10086/d78cbc96b052713835e759e45e3b38ea.jpg','智能硬件',3,'-1',0),(2,1,'3599',999,'满1000减10','http://localhost:10086/101cd40110bd5b3661b1fb2a915b6ec6.jpg','智能硬件',3,'-1',1),(3,6,'2599',100,'无','http://localhost:10086/8aa7f7757555884cb35fe82761022e9a.jpg','小米手机',6,'-1',1),(4,1,'3100',2000,'满100减10','http://localhost:10086/29495c314b22356d937fcce68d79faac.jpg','智能硬件',3,'-1',NULL),(5,6,'4599',1000,'立减500','http://localhost:10086/5c5e2b565fb16ffd729dd97cc4e507ec.jpg','小米手机',6,'-1',NULL),(6,6,'30',589,'无','http://localhost:10086/80c412599de46f0bce1492b9b0f03b4e.jpg','小米手机',6,'-1',NULL),(7,8,'5500',3000,'火爆热销中','http://localhost:10086/fc1dac85ee75121961aa2e8aab93375f.jpg','笔记本',5,'-1',0),(13,8,'7599',100000,'无','http://localhost:10086/f4f33ff437e18fab9293203d4b204536.jpg','笔记本',5,'-1',NULL),(40,84,'3699',2000,'3699','http://localhost:10086/4400923827a8b094f1d77ace10f0ddd1.jpg','小米手机',6,'1',NULL),(47,93,'4999',999,'满5000减200','http://localhost:10086/47c36cb035cdfe8068c5fc9a9eacf804.jpg','笔记本',5,'-1',NULL),(48,94,'3799',999,'无','http://localhost:10086/1db435cab920d5af4ebc56a4def3a533.jpg','电视机',2,'-1',NULL),(50,96,'699',999,'无','http://localhost:10086/393e14d90afdff9369e6e5f6f64e1a44.jpg','电视机',2,'-1',NULL),(58,101,'699',999,'无','http://localhost:10086/e90f53670461a8a1f8e7edb6f350eeba.png','红米手机',4,'-1',NULL),(56,99,'499',999,'无','http://localhost:10086/18a1a94508a70df74b8fc4cc8cb84631.jpg','智能硬件',3,'-1',NULL),(57,100,'1299',999,'无','http://localhost:10086/0c973547c26f16e3898d35fd570e571b.jpg','智能硬件',3,'-1',NULL),(59,102,'499',999,'无','http://localhost:10086/7cdaf2e1575aa9c138d8a08cf98f34a9.png','路由器',1,'-1',0),(60,103,'239',999,'无','http://localhost:10086/a7715ee35068529ceba23cf30e2f5302.jpg','出行',37,'1',NULL),(61,104,'18',999,'无','http://localhost:10086/a7b2a8d4f95309279895c7d616eabc4b.jpg','电源',38,NULL,NULL),(62,105,'249',999,'无','http://localhost:10086/286ffe3072f55c4242d3edc0e0d1bd13.jpg','健康',39,NULL,0),(63,106,'299',341,'无','http://localhost:10086/6f4088dcfd7021424728e2abf21bad18.jpg','耳机',40,'1',1),(64,108,'98',999,'无','http://localhost:10086/d3e66da936c9f2375cb15cc760729268.jpg','生活',41,NULL,NULL),(65,109,'999',999,'无','http://localhost:10086/27e85cd044d6ee8e2932b8ca9228d9c6.png','红米手机',4,NULL,NULL),(66,110,'999',88,'无','http://localhost:10086/e8924cb5d4c85694f367166cd71e6201.png','红米手机',4,NULL,NULL),(67,111,'1399',567,'无','http://localhost:10086/4c2765e0d8eadedfd2c8adc22c582959.png','红米手机',4,NULL,NULL),(68,112,'1200',674,'无','http://localhost:10086/c2ca1b4b29870ef98f8470449591dcc9.jpg','红米手机',4,'-1',NULL),(69,113,'899',345,'无','http://localhost:10086/148efcaa5217f4ae9f3f5f9c27f9bbe1.jpg','小米手机',6,NULL,NULL),(70,114,'799',123,'无','http://localhost:10086/f46b1977faa5a3cfcc36e1c31599aff5.png','红米手机',4,NULL,NULL),(71,115,'19999',5,'无','http://localhost:10086/296a7f459e5e79d58394da3b536ff3a9.jpg','小米手机',6,'1',NULL),(72,116,'1699',124,'无','http://localhost:10086/4d51428ab9754a0319f8a944c3be82ae.jpg','电视机',2,'-1',NULL),(73,117,'2699',1412,'无','http://localhost:10086/6d5a6dc3a3bf79ac2660ca402b51f1b5.jpg','电视机',2,NULL,NULL),(74,118,'999',657,'无','http://localhost:10086/9d34970727b7bcefb93736b1ca40e6b2.jpg','电视机',2,NULL,NULL),(75,119,'1699',2352,'无','http://localhost:10086/0ed15b8230b57a1903728612a0b5e947.jpg','电视机',2,NULL,NULL),(76,120,'2499',6456,'无','http://localhost:10086/3f6599b346c8525e28c027fa6f794b38.jpg','电视机',2,NULL,NULL),(77,121,'6999',131,'无','http://localhost:10086/ddf5a2b795a82e464bee8aa9d45414fe.jpg','电视机',2,NULL,NULL),(78,122,'1699',212,'无','http://localhost:10086/7bd5a93a5676926d345f85f9cc50f0a8.jpg','智能硬件',3,NULL,NULL),(79,123,'169',354,'无','http://localhost:10086/4989ad80f666a81c576224d883225757.jpg','智能硬件',3,'1',NULL),(80,124,'199',1412,'无','http://localhost:10086/e5b7c98bf4040667bf16d2177d335d7f.jpg','智能硬件',3,NULL,NULL),(81,125,'499',345,'无','http://localhost:10086/7502b1f79eea0096e8117e979e85c410.jpg','智能硬件',3,NULL,NULL),(82,126,'169',213,'无','http://localhost:10086/9c58a88ca72fdf276b97d4bed5f152ff.jpg','智能硬件',3,NULL,NULL),(83,127,'999',473,'无','http://localhost:10086/8df942fa23375a15f6dc72493771499c.jpg','智能硬件',3,NULL,NULL),(84,128,'99',785,'无','http://localhost:10086/8f8a05a0575e7c354bc4475d8850478c.jpg','智能硬件',3,NULL,NULL),(85,129,'2799',1421,'无','http://localhost:10086/78cdf5596c5aca5f9c11b97c39f2f8b5.jpg','智能硬件',3,NULL,NULL),(86,130,'399',356,'无','http://localhost:10086/da8d692f52e0b92a438224e8450e06f4.jpg','耳机',40,NULL,NULL),(87,131,'149',123,'无','http://localhost:10086/2ac73e5ceb201052c45969962b2b5f4b.jpg','电源',38,NULL,NULL),(88,132,'59',344,'无','http://localhost:10086/019345f53418ea477fca38493fd23119.jpg','电源',38,NULL,NULL),(89,133,'99',345,'无','http://localhost:10086/8bf4653656e61cc9e5494582fbd76883.jpg','电源',38,NULL,NULL),(90,134,'39',543,'无','http://localhost:10086/7b389971c6a7b862b1388e5bc60bbaf0.jpg','电源',38,NULL,NULL),(91,135,'199',179,'无','http://localhost:10086/e37f8435b495059cc14164e47caf5283.jpg','耳机',40,NULL,NULL),(92,136,'499',443,'无','http://localhost:10086/ad8f1da3e4c567b8ca132490638f634e.jpg','耳机',40,NULL,NULL),(93,137,'59',425,'无','http://localhost:10086/b205893b9fed4575c02ba9314d0d8854.png','耳机',40,NULL,NULL),(94,138,'149',141,'无','http://localhost:10086/d1339fc3f1a2a3d8b878ce6e02cf18ab.jpg','路由器',1,NULL,NULL),(95,139,'199',3463,'无','http://localhost:10086/1ad1f1addedd9a598d10377170785d4c.png','电视机',2,NULL,NULL),(96,140,'49',542,'无','http://localhost:10086/400e37a2df4e9debb3d12296c7d3ab7a.png','路由器',1,NULL,NULL),(97,141,'59',374,'无','http://localhost:10086/fa798446db7de45d9856b49169d25daa.jpg','路由器',1,NULL,NULL),(98,142,'18.9',124,'无','http://localhost:10086/222fc1ab530cf5d72fc7dabfb0f7661e.jpg','路由器',1,NULL,NULL),(99,143,'59',213,'无','http://localhost:10086/3458994d6feda3e962649b36719bf77f.jpg','路由器',1,NULL,NULL),(100,144,'19.9',324,'无','http://localhost:10086/3576d748f57c9704d320d607c525a69a.jpg','路由器',NULL,'-1',NULL),(101,145,'49',241,'无','http://localhost:10086/11938189e2fe02586d03c57ca006e12e.jpg','路由器',1,NULL,NULL),(102,146,'79',1244,'无','http://localhost:10086/5cc2c8ee40cdbf7f97a034b0cd8cfe57.jpg','路由器',3,'1',NULL),(103,147,'39',12321,'无','http://localhost:10086/b3e17216d5694b4721448b198b15ea53.jpg','路由器',1,NULL,NULL),(104,148,'99',1231,'无','http://localhost:10086/0ad6f67699fb23c627205d4e15962f8c.jpg','生活',41,NULL,NULL),(105,149,'29',132,'无','http://localhost:10086/d4f10976e4281c03f476d7da1b3ebbcf.png','出行',37,NULL,NULL),(106,150,'199',1234,'无','http://localhost:10086/5d2be237079d165724cabd06925c93fc.jpg','生活',41,NULL,NULL),(107,151,'9.99',2131,'无','http://localhost:10086/224ec86e0a0baf278af3fa319914af81.jpg','生活',41,NULL,NULL),(108,152,'399',213,'无','http://localhost:10086/3f998de9cbc65cf4a265a4b80969f93a.jpg','出行',37,NULL,NULL),(109,153,'49',1412,'无','http://localhost:10086/7e91970f37c4e52c46deb5e65b8918a8.jpg','生活',41,NULL,NULL),(110,154,'129',12431,'无','http://localhost:10086/51861475f398376b03dab9dc8dd64394.jpg','生活',41,NULL,NULL),(111,155,'699',242,'无','http://localhost:10086/5b715ca86323713b9af0f7188103f194.jpg','出行',37,NULL,NULL),(112,156,'69',1231,'无','http://localhost:10086/9300da58bf7dd8df553dcb01932e578b.jpg','出行',37,NULL,NULL),(113,157,'369',213,'无','http://localhost:10086/592a41745d07a7438e8915953445f215.png','出行',37,NULL,NULL),(114,158,'179',241,'无','http://localhost:10086/b61922b8700b1cba68f1658f32aa971c.jpg','健康',39,NULL,NULL),(115,159,'199',435,'无','http://localhost:10086/1f6e85443406b27fe7b1ec87a8c1adf5.jpg','健康',39,NULL,NULL),(116,160,'699',2141,'无','http://localhost:10086/1c702333592e6b395aacc514f7d3f424.png','健康',39,NULL,NULL),(117,161,'199',1234,'无','http://localhost:10086/c06541b1eac2eb830499a0ff721e40dc.jpg','健康',39,'-1',NULL),(118,162,'199',245,'无','http://localhost:10086/2a74b361a69c78a595203bab5a14bc7a.jpg','健康',39,NULL,NULL),(119,163,'7299',214,'无','http://localhost:10086/819a1b0787e073484959e5790d46602b.jpg','笔记本',NULL,NULL,NULL),(120,164,'3999',4231,'无','http://localhost:10086/819a1b0787e073484959e5790d46602b.jpg','笔记本',5,NULL,NULL);

/*Table structure for table `merchants` */

DROP TABLE IF EXISTS `merchants`;

CREATE TABLE `merchants` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `count` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `emial` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

/*Data for the table `merchants` */

insert  into `merchants`(`id`,`username`,`count`,`pwd`,`phone`,`emial`) values (1,'zxj','8245','1231231231','18888888888','12321312@qq.com'),(2,'jxz','5434','36453453','19999999999','2131234@163.com'),(3,'lxc','4581','2523423','20000000000','sdadasd@qq.com'),(13,'我不是肖纯','899314005','ZXJ.3011','18850387075','543440192@qq.com'),(14,'张晓均','8996064094','ZXJ.3011','15860301262','543440192@qq.com');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `count` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`count`,`pwd`) values (1,'admin','123');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
