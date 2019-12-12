new Vue({
	el: '#christmas',
	data: {
		isRule: false,
		isAward: false,
		list: [],
		select: '1',
		navSelect: '3',
		listMap: {
			'13': 'christmasTreeAnchor',
			'14': 'christmasTreeUser',
			'23': 'santaClausAnchor',
			'24': 'santaClausUser'
		},
		source: {
			"christmasTreeUser":[
				{"uid":"10105","uname":"lcmouse3","figureurl":"http://img.justfun.live/upload/154400068260048.png","giftNum":3256},
				{"uid":"10002428","uname":"張","figureurl":"http://img.justfun.live/upload/156325975593532.png","giftNum":1980},
				{"uid":"10002613","uname":"叭叭叭爸爸妈妈","figureurl":"http://img.justfun.live/avatar/defaulttest.png","giftNum":1316},
				{"uid":"10002187","uname":"♂Dingo|⊙","figureurl":"http://img.justfun.live/upload/1542775960758442.jpg","giftNum":940},
				{"uid":"10002154","uname":"So~NY","figureurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/NZU4ayibApB4ddGEZZyOyzMraZMh8hicuXXHBpPjxuN6oWQCYU44xeDseu8KzO3j0Ss7mBSXJ3Sng2xYlYazA3Lg/132","giftNum":586},
				{"uid":"17714","uname":"lcmouse8","figureurl":"http://img.justfun.live/upload/1538117297565112.jpg","giftNum":528},
				{"uid":"17715","uname":"lcmouse9","figureurl":"http://img.justfun.live/upload/153810085879311.png","giftNum":521},
				{"uid":"10002164","uname":"爱折腾的LSP您吃_10002164","figureurl":"http://img.justfun.live/upload/153794759527882.jpg","giftNum":406},
				{"uid":"10002212","uname":"SO3097","figureurl":"http://img.justfun.live/upload/1537411253709651.jpg","giftNum":110},
				{"uid":"17795","uname":"lcmouse12","figureurl":"http://img.justfun.live/upload/1537969783226922.jpg","giftNum":100}
			],
			"christmasTreeAnchor":[
				{"uid":"10002442","uname":"心逐","figureurl":"http://img.justfun.live/upload/1548041478783641.png","giftNum":2664},
				{"uid":"10002362","uname":"Boring","figureurl":"http://img.justfun.live/upload/156784790828881.png","giftNum":2091},
				{"uid":"10105","uname":"lcmouse3","figureurl":"http://img.justfun.live/upload/154400068260048.png","giftNum":1428},
				{"uid":"17714","uname":"lcmouse8","figureurl":"http://img.justfun.live/upload/1538117297565112.jpg","giftNum":834},
				{"uid":"17741","uname":"lcmouse10","figureurl":"http://img.justfun.live/upload/154250987560758.png","giftNum":805},
				{"uid":"16161","uname":"lcmouse7","figureurl":"http://img.justfun.live/upload/1543979091750352.jpg","giftNum":666},
				{"uid":"10002164","uname":"爱折腾的LSP您吃_10002164","figureurl":"http://img.justfun.live/upload/153794759527882.jpg","giftNum":620},
				{"uid":"10002134","uname":"lcmouse21","figureurl":"http://img.justfun.live/upload/1537976995599821.png","giftNum":591},
				{"uid":"10002187","uname":"♂Dingo|⊙","figureurl":"http://img.justfun.live/upload/1542775960758442.jpg","giftNum":128},
				{"uid":"10002219","uname":"小树苗","figureurl":"http://img.justfun.live/upload/1542519816605791.png","giftNum":87}
			],
			"santaClausUser":[
				{"uid":"10002190","uname":"LSportS","figureurl":"http://img.justfun.live/upload/1537871211107591.png","giftNum":2966},
				{"uid":"10002216","uname":"九蛋","figureurl":"http://img.justfun.live/upload/1537947077432942.jpg","giftNum":1569},
				{"uid":"10002187","uname":"♂Dingo|⊙","figureurl":"http://img.justfun.live/upload/1542775960758442.jpg","giftNum":655},
				{"uid":"3263404","uname":"lcmouse15","figureurl":"http://img.justfun.live/upload/1539936375558191.png","giftNum":599},
				{"uid":"10002209","uname":"郭大锤 👊","figureurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epI22oEev0jbsm6kCXmS6ibThk9iasSk6L22ubu4HDpOLP6tTEMoib9r1Wk7MGL7xf4Y1iapc8DPjHbpg/132","giftNum":522},
				{"uid":"10002186","uname":"DINGO","figureurl":"http://img.justfun.live/upload/1537409118065331.jpg","giftNum":408},
				{"uid":"10002164","uname":"爱折腾的LSP您吃_10002164","figureurl":"http://img.justfun.live/upload/153794759527882.jpg","giftNum":353},
				{"uid":"17714","uname":"lcmouse8","figureurl":"http://img.justfun.live/upload/1538117297565112.jpg","giftNum":253},
				{"uid":"3263395","uname":"♂Dingo|⊙","figureurl":"http://img.justfun.live/upload/153797545796082.jpg","giftNum":208},
				{"uid":"10105","uname":"lcmouse3","figureurl":"http://img.justfun.live/upload/154400068260048.png","giftNum":175}
			],
			"santaClausAnchor":[
				{"uid":"10002216","uname":"九蛋","figureurl":"http://img.justfun.live/upload/1537947077432942.jpg","giftNum":2905},
				{"uid":"17715","uname":"lcmouse9","figureurl":"http://img.justfun.live/upload/153810085879311.png","giftNum":1581},
				{"uid":"10105","uname":"lcmouse3","figureurl":"http://img.justfun.live/upload/154400068260048.png","giftNum":974},
				{"uid":"3263395","uname":"♂Dingo|⊙","figureurl":"http://img.justfun.live/upload/153797545796082.jpg","giftNum":535},
				{"uid":"10002164","uname":"爱折腾的LSP您吃_10002164","figureurl":"http://img.justfun.live/upload/153794759527882.jpg","giftNum":531},
				{"uid":"17714","uname":"lcmouse8","figureurl":"http://img.justfun.live/upload/1538117297565112.jpg","giftNum":274},
				{"uid":"10002167","uname":"盖世英雄就是我","figureurl":"http://img.justfun.live/upload/1537932453525691.png","giftNum":272},
				{"uid":"16161","uname":"lcmouse7","figureurl":"http://img.justfun.live/upload/1543979091750352.jpg","giftNum":200},
				{"uid":"10002187","uname":"♂Dingo|⊙","figureurl":"http://img.justfun.live/upload/1542775960758442.jpg","giftNum":196},
				{"uid":"43387","uname":"我就是想测一下名字的长度呵呵","figureurl":"http://img.justfun.live/upload/1537948984486282.jpg","giftNum":185}
			]
		}
	},
	methods: {
		openRule() {
			this.isRule = true
		},
		openAward() {
			this.isAward = true
		},
		closeRule() {
			this.isRule = false
		},
		closeAward() {
			this.isAward = false
		},
		fetchList() {
			Axios.get('/proxy/sports-activity/christmas/rank', {
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				}
			}).then(res => {
				console.log(res)
			}).catch(err => {
				console.log(err)
			})
		},
		freshList() {
			var t = this.select + this.navSelect
			this.list = this.source[this.listMap[t]]
		},
		selectTab(type) {
			this.select = type
			this.freshList()
		},
		selectNav(type) {
			this.navSelect = type
			this.freshList()
		}
	},
	mounted() {
		this.fetchList()
		this.freshList()
	}
})