import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

   times = {
    "min": 60,
    "hour": Math.pow(60,2),
    "day": (Math.pow(60,2) * 24),
    "week": (Math.pow(60,2) * 24 * 7),
    "month": (Math.pow(60,2) * 24 * 7 * 4),
    "year": (Math.pow(60,2) * 24 * 7 * 4 * 12)
  };
  calcTime(date, max) {
    if (!date) return "";
    var d = new Date(date),
      diff = ((Date.now() - d.getTime()) / 1000);
    if (diff < this.times.min) {
      return "now";
    } else if (diff < this.times.hour) {
      return Math.floor(diff / this.times.min) + " min ago";
    } else if (diff < this.times.day) {
      return Math.floor(diff / this.times.hour) + " hours ago";
    } else if (diff < this.times.week) {
      return Math.floor(diff / this.times.day) + " days ago";
    } else if (diff < this.times.month) {
      return Math.floor(diff / this.times.week) + " weeks ago";
    } else if (diff < this.times.year) {
      return Math.floor(diff / this.times.month) + " months ago";
    } //else over a year
    return "over a year ago";
 }

 mongoIdToDate(id){
   var timestamp = id.substring(0,8)
   return new Date( parseInt( timestamp, 16 ) * 1000 )
 }

  constructor() { }
}
