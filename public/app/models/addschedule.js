const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Addschedule = new Schema({
    doctorId: { type: String },
    date: { type: Date },
    time1: { type: Boolean },
    time2: { type: Boolean },
    time3: { type: Boolean },
    time4: { type: Boolean },
    time5: { type: Boolean },
    time6: { type: Boolean },
    time7: { type: Boolean },
    time8: { type: Boolean },
    time9: { type: Boolean },
    time10: { type: Boolean },
    time11: { type: Boolean },
    time12: { type: Boolean },
    date1: { type: Date },
    time13: { type: Boolean },
    time14: { type: Boolean },
    time15: { type: Boolean },
    time16: { type: Boolean },
    time17: { type: Boolean },
    time18: { type: Boolean },
    time19: { type: Boolean },
    time20: { type: Boolean },
    time21: { type: Boolean },
    time22: { type: Boolean },
    time23: { type: Boolean },
    time24: { type: Boolean },
    date2: { type: Date },
    time25: { type: Boolean },
    time26: { type: Boolean },
    time27: { type: Boolean },
    time28: { type: Boolean },
    time29: { type: Boolean },
    time30: { type: Boolean },
    time31: { type: Boolean },
    time32: { type: Boolean },
    time33: { type: Boolean },
    time34: { type: Boolean },
    time35: { type: Boolean },
    time36: { type: Boolean },
    date3: { type: Date },
    time37: { type: Boolean },
    time38: { type: Boolean },
    time39: { type: Boolean },
    time40: { type: Boolean },
    time41: { type: Boolean },
    time42: { type: Boolean },
    time43: { type: Boolean },
    time44: { type: Boolean },
    time45: { type: Boolean },
    time46: { type: Boolean },
    time47: { type: Boolean },
    time48: { type: Boolean },
    date4: { type: Date },
    time49: { type: Boolean },
    time50: { type: Boolean },
    time51: { type: Boolean },
    time52: { type: Boolean },
    time53: { type: Boolean },
    time54: { type: Boolean },
    time55: { type: Boolean },
    time56: { type: Boolean },
    time57: { type: Boolean },
    time58: { type: Boolean },
    time59: { type: Boolean },
    time60: { type: Boolean },
    date5: { type: Date },
    time61: { type: Boolean },
    time62: { type: Boolean },
    time63: { type: Boolean },
    time64: { type: Boolean },
    time65: { type: Boolean },
    time66: { type: Boolean },
    time67: { type: Boolean },
    time68: { type: Boolean },
    time69: { type: Boolean },
    time70: { type: Boolean },
    time71: { type: Boolean },
    time72: { type: Boolean },
    slug: { type: String, slug: 'date', unique: true },
}, {
    timestamps: true,
}, );
module.exports = mongoose.model('Addschedule', Addschedule);