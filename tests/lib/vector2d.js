'use strict';
const proxyquire = require('proxyquire').noPreserveCache();
const sinon = require('sinon');
const should = require('should');
const Vector2d = require('../../lib/vector2d');

describe('Vector2d', () => {
	const zero = {x: 0, y: 0};
	describe('.setXY', () => {
		it('should set x and y', () => {
			let obj = {};
			Vector2d.setXY(obj, 3, 7);
			obj.should.be.eql({x: 3, y: 7});

			let other = {x: 1, y: 5};
			Vector2d.setXY(other, 5, 1);
			other.should.be.eql({x: 5, y: 1});
		});
	});
	describe('.setToZero', () => {
		it('should set vector to {0, 0}', () => {
			let obj = {};
			Vector2d.setToZero(obj);
			obj.should.be.eql(zero);

			let other = {x: 1, y: 5};
			Vector2d.setToZero(other);
			other.should.be.eql(zero);
		});
	});
	describe('.getZero', () => {
		it('should return vector {0, 0}', () => {
			Vector2d.getZero().should.be.eql(zero);
		});
	});
	describe('.getX', () => {
		it('should return x', () => {
			let obj = {};
			Vector2d.getX(obj).should.be.eql(0);
			obj.should.be.eql({});

			let other = {x: 4};
			Vector2d.getX(other).should.be.eql(4);
			other.should.be.eql({x: 4});

			let third = {foo: 'foo', x: 7, z: 45, y: -5};
			Vector2d.getX(third).should.be.eql(7);
			third.should.be.eql({foo: 'foo', x: 7, z: 45, y: -5});
		});
	});
	describe('.getY', () => {
		it('should return y', () => {
			let obj = {};
			Vector2d.getY(obj).should.be.eql(0);
			obj.should.be.eql({});

			let other = {y: 4};
			Vector2d.getY(other).should.be.eql(4);
			other.should.be.eql({y: 4});

			let third = {foo: 'foo', x: 7, z: 45, y: -5};
			Vector2d.getY(third).should.be.eql(-5);
			third.should.be.eql({foo: 'foo', x: 7, z: 45, y: -5});
		});
	});
	describe('.getXY', () => {
		it('should return {x, y}', () => {
			let obj = {};
			Vector2d.getXY(obj).should.be.eql(zero);
			obj.should.be.eql({});

			let other = {y: 4};
			Vector2d.getXY(other).should.be.eql({x: 0, y: 4});
			other.should.be.eql({y: 4});

			let third = {foo: 'foo', x: 7, z: 45, y: -5};
			Vector2d.getXY(third).should.be.eql({x: 7, y: -5});
			third.should.be.eql({foo: 'foo', x: 7, z: 45, y: -5});
		});
	});
	describe('.getVectorLengthSinCos', () => {
		it('should return created vector {length * cosr, length * sinr}', () => {
			let length, sinr, cosr;
			sinr = 3 / 5;
			cosr = 4 / 5;
			length = 5;
			Vector2d.getVectorLengthSinCos(length, sinr, cosr).should.be.eql({x: 4, y: 3});

			sinr = 0;
			cosr = 1;
			length = 7;
			Vector2d.getVectorLengthSinCos(length, sinr, cosr).should.be.eql({x: 7, y: 0});
		});
	});
	describe('.getVectorLengthRadian', () => {
		it('should return created vector {length * cos(r), length * sin(r)}', () => {
			let length, radian;
			length = 1;
			radian = 0;
			Vector2d.getVectorLengthRadian(length, radian).should.be.eql({
				x: length * Math.cos(radian),
				y: length * Math.sin(radian)
			});

			length = 5;
			radian = 0.3;
			Vector2d.getVectorLengthRadian(length, radian).should.be.eql({
				x: length * Math.cos(radian),
				y: length * Math.sin(radian)
			});
		});
	});
	describe('.equals', () => {
		it('should return true if vectors are equal', () => {
			let first, second;

			first = Vector2d.getZero();
			second = Vector2d.getZero();
			Vector2d.equals(first, second).should.be.true();

			first = Vector2d.getVectorXY(4, 7);
			second = Vector2d.getVectorXY(4, 7);
			Vector2d.equals(first, second).should.be.true();
		});

		it('should return false if vectors are not equal', () => {
			let first, second;
			
			first = Vector2d.getZero();
			second = Vector2d.getVectorXY(4, 7);
			Vector2d.equals(first, second).should.be.false();

			first = Vector2d.getVectorXY(4, 7);
			second = Vector2d.getVectorXY(4, 3);
			Vector2d.equals(first, second).should.be.false();
		});
	});
});