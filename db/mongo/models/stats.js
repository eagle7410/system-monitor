const os = require('os');
const db = require('mongoose');
const util = require('utils-igor')(['date', 'obj', 'type']);
const moment = require('moment');
const Model = db.model('stats', db.Schema({
	_id: {
		type: Number,
		default: util.date.tsToMin()
	},
	memoryFreeMb: {type: Number, default: 0},
	memoryFreePer: {type: Number, default: 0},
	cpuPer: {type: Number, default: 0},
	created: {
		type: Date,
		default: new Date()
	}
}));

const round = (num) => Math.round(num * 100) / 100;
const float = tx => parseFloat(tx);
const toMb = bytes => round(bytes / 1048576);
const getData = () => {
	let memTotal = toMb(os.totalmem());
	let memFree = toMb(os.freemem());
	let cpu = os.cpus();
	let cpuTotal = 0;
	let cpuFreeTime = 0;
	let cpuFreePer = 0;

	for (let i = 0; i < cpu.length; i++) {
		util.obj.each(cpu[i].times, (type, val) => cpuTotal += float(val));
		cpuFreeTime += float(cpu[i].times.idle);
	}

	cpuFreePer = cpuFreeTime * 100 / cpuTotal;

	Model.findOneAndUpdate({
			_id: util.date.tsToMin()
		}, {
			memoryFreeMb: memFree,
			memoryFreePer: round(memFree * 100 / memTotal),
			cpuPer: round(100 - cpuFreePer)
		}, {
			upsert: true,
			new: true,
			setDefaultsOnInsert: true
		}
	).then(util.type.noop, e => console.log('Error save stats', e));

};

const collected = () => {
	getData();
	setInterval(getData, 60000);
};

const fromTo = (from, to) => new Promise((ok, bad) => {
	let dateFrom = new Date(from.replace(/-/g, '/'));
	let dateTo = new Date(to.replace(/-/g, '/'));
	let tsFrom = dateFrom.getTime();
	let tsTo = dateTo.getTime();

	if (isNaN(tsFrom) || isNaN(tsTo)) {
		console.log('~! Stats\fromTo Bad params');
		return bad('BadParams');
	}

	if (tsFrom > tsTo) {
		let b = dateTo;
		dateTo = dateFrom;
		dateFrom = b;
	}

	Model.find({
			created: {
				$gte: dateFrom,
				$lt: dateTo
			},
			$where: 'this._id % 60 === 0'
		}, {
			memoryFreePer: 1,
			cpuPer: 1
		}
	).then(r => ok(r), e => {
			console.log(`Error get stats ${from}, ${to}`, e);
			bad('mongoErr');
		}
	);
});

const clearSync = storeDays => {
	let d = new Date();
	d.setDate(d.getDate() - storeDays - 1 );

	Model.remove({created : {$lt : d}})
		.then(cursor =>console.log(`~ Clear db. Remove ${cursor.result.n} records.`), e => console.log('~! Error clear db'));
};

const clear = storeDays => {
	clearSync(storeDays);
	setInterval(clearSync, util.date.ts.DAY);
};

module.exports = {
	collected: collected,
	fromTo: fromTo,
	clear : clear
};
