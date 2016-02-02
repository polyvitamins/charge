var extend = require('extend');
var mixin = require('mixin');

/* Расширяет объект классом */
	module.exports = function(target, exhibitor) {

		/*
		Создаем единый слой свойств из прототипов класса
		*/
		var overprototype = {};
		if ("object"===typeof exhibitor.prototype.__super__) {
			mixin(overprototype, exhibitor.prototype.__super__);
		}
		mixin(overprototype, exhibitor.prototype);
		/*
		Если мы имеем доступ к __proto__ то расширяем прототип, если нет - то придется расширять сам объект.
		Прототип расширяемого объекта должен быть уникальным, перед расширением необходимо проверить является ли 
		он прототипом Object
		*/

		if (target.__proto__ && target.__proto__===Object.prototype) {
			target.__proto__=Object.create(null);
			window.tar = target;
		}
		if ("object"===typeof target.__proto__) {
			/*
			Производим слияние прототипа цели с прототипом экспонента
			Если прототип уже установлен и мы имеем к нему доступ нам необходимо
			существующий прототип погрузить на уровень вниз
			*/
			target.__proto__ = Object.create(target.__proto__);
			mixin(target.__proto__, overprototype);
		} else {
			extend(target, overprototype);
		}

		/*
		Воспроизводим конструкторы
		*/

		exhibitor.apply(target);
		
		return target;
	}