'use strict';
const Vector = {
	setXY(vector, x, y) {
		vector.x = x;
		vector.y = y;
	},
	setToZero(vector) {
		Vector.setXY(vector, 0, 0);
	},
	getZero() {
		return {
			x: 0,
			y: 0
		};
	},
	getX(vector) {
		return vector.x;
	},
	getY(vector) {
		return vector.y;
	},
	getXY(vector) {
		return {
			x: vector.x,
			y: vector.y
		};
	},
	getXYLengthSinCos(length, sinr, cosr) {
		return {
			x: length * cosr,
			y: length * sinr
		};
	},
	getXYLengthRadian(length, radian) {
		let sinr = Math.sin(radian);
		let cosr = Math.cos(radian);
		return Vector.getXYLengthSinCos(length, sinr, cosr);
	},
	getQuarter(vector) {
		let quarter = 0; // first
		if(vector.x >= 0) {
			if(vector.y < 0) {
				quarter = 3; // fourth
			}
		} else {
			if(vector.y >= 0) {
				quarter = 1; // second
			} else {
				quarter = 2; // third
			}
		}
		return quarter;
	},
	getQuarterAccording(vector, center) {
		return Vector.getQuarter(Vector.getDiff(vector, center));
	},
	getMiddleVector(first, second) {
		let summ = Vector.getAdd(first, second);
		Vector.multFirstOnNumber(summ, 0.5);
		return summ;
	},
	getMiddleVectorWithWeight(first, firstWeight, second, secondWeight) {
		if(firstWeight == secondWeight) {
			return Vector.getMiddleVector(first, second);
		}
		if(firstWeight > 0 && secondWeight > 0) {
			let weight = firstWeight + secondWeight;
			let kFirst = firstWeight / weight;
			let kSecond = secondWeight / weight;
			return {
				x: first.x * kFirst + second.x * kSecond,
				y: first.y * kFirst + second.y * kSecond
			};
		}
		return Vector.getZero();
	},
	assignToFirst(first, second) {
		Vector.setXY(first, second.x, second.y);
	},
	addToFirst(first, second) {
		first.x += second.x;
		first.y += second.y;
	},
	getAdd(first, second) {
		return {
			x: first.x + second.x,
			y: first.y + second.y
		};
	},
	subFromFirst(first, second) {
		first.x -= second.x;
		first.y -= second.y;
	},
	getDiff(first, second) {
		return {
			x: first.x - second.x,
			y: first.y - second.y
		};
	},
	multFirstOnNumber(vector, num) {
		vector.x *= num;
		vector.y *= num;
	},
	getMultNum(vector, num) {
		return {
			x: vector.x * num,
			y: vector.y * num
		};
	},
	getLengthSq(vector) {
		return vector.x * vector.x + vector.y * vector.y;
	},
	getLength(vector) {
		return Math.sqrt(Vector.getLengthSq(vector));
	},
	getDistanceSq(first, second) {
		return Vector.getLengthSq(Vector.getDiff(first, second));
	},
	getDistance(first, second) {
		return Math.sqrt(Vector.getDistanceSq(first, second));
	},
	reverseX(vector) {
		vector.x = -vector.x;
	},
	reverseY(vector) {
		vector.y = -vector.y;
	},
	reverse(vector) {
		Vector.reverseX(vector);
		Vector.reverseY(vector);
	},
	setLength(vector, newLength) {
		newLength = newLength || 0;
		if(newLength < 0) {
			Vector.reverse(vector);
			newLength = -newLength;
		}
		if(newLength == 0) {
			Vector.setToZero(vector);
		} else {
			let oldLength = Vector.getLength(vector);
			if(oldLength > 0) {
				let k = newLength / oldLength;
				Vector.multFirstOnNumber(vector, k);
			}
		}
	},
	getSignedRadian(vector) {
		let radian = 0;
	    if(vector.x == 0) {
	        if(vector.y >= 0) {
	            radian = Math.PI / 2;
	        } else {
	            radian = -Math.PI / 2;
	        }
	    } else {
	        if(vector.y == 0) {
	            if(vector.x > 0) {
	                radian = 0;
	            } else {
	                radian = Math.PI;
	            }
	        } else {
	            radian = Math.atan(vector.y / vector.x);
	            if(this.y > 0) {
	                if(radian < 0) {
	                    radian += Math.PI;
	                }
	            } else {
	                if(radian >= 0) {
	                    radian += -Math.PI;
	                }
	            }
	        }
	    }
	    return radian;
	},
	getRadian(vector) {
		let radian = Vector.getSignedRadian(vector);
		if(radian < 0) {
			radian += 2 * Math.PI;
		}
		return radian;
	},
	setRadianSinCos(vector, sinr, cosr) {
		let length = Vector.getLength(vector);
		Vector.setXY(vector, length * cosr, length * sinr);
	},
	setRadian(vector, radian) {
		let sinr = Math.sin(radian);
		let cosr = Math.cos(radian);
		Vector.setRadianSinCos(vector, sinr, cosr);
	},
	getScalar(first, second) {
		return first.x * second.x + first.y * second.y;
	},
	getRadianBetween(first, second) {
		return Math.abs(Vector.getSignedRadianBetween(first, second));
	},
	getSignedRadianBetween(first, second) {
		let radian = Vector.getSignedRadian(first) - Vector.getSignedRadian(second);
		if(radian > Math.PI) {
			radian -= 2 * Math.PI;
		}
		return radian;
	},
	normalize(vector) {
		Vector.setLength(vector, 1);
	},
	getRotate(vector, radian) {
		let sinr = Math.sin(radian);
		let cosr = Math.cos(radian);
		return {
			x: vector.x * cosr - vector.y * sinr,
			y: vector.x * sinr + vector.y * cosr
		};
	},
	rotate(vector, radian) {
		let coord = Vector.getRotate(vector, radian);
		Vector.assignToFirst(vector, coord);
	}
};

module.exports = Vector;