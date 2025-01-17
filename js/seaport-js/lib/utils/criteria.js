"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemToCriteriaMap = exports.generateCriteriaResolvers = void 0;
var constants_1 = require("../constants");
var item_1 = require("./item");
var generateCriteriaResolvers = function (_a) {
    var orders = _a.orders, _b = _a.offerCriterias, offerCriterias = _b === void 0 ? [[]] : _b, _c = _a.considerationCriterias, considerationCriterias = _c === void 0 ? [[]] : _c;
    var offerCriteriaItems = orders.flatMap(function (order, orderIndex) {
        return order.parameters.offer
            .map(function (item, index) {
            return ({
                orderIndex: orderIndex,
                item: item,
                index: index,
                side: constants_1.Side.OFFER,
            });
        })
            .filter(function (_a) {
            var item = _a.item;
            return (0, item_1.isCriteriaItem)(item.itemType);
        });
    });
    var considerationCriteriaItems = orders.flatMap(function (order, orderIndex) {
        return order.parameters.consideration
            .map(function (item, index) {
            return ({
                orderIndex: orderIndex,
                item: item,
                index: index,
                side: constants_1.Side.CONSIDERATION,
            });
        })
            .filter(function (_a) {
            var item = _a.item;
            return (0, item_1.isCriteriaItem)(item.itemType);
        });
    });
    var mapCriteriaItemsToResolver = function (criteriaItems, criterias) {
        return criteriaItems.map(function (_a, i) {
            var orderIndex = _a.orderIndex, item = _a.item, index = _a.index, side = _a.side;
            var merkleRoot = item.identifierOrCriteria || "0";
            var inputCriteria = criterias[orderIndex][i];
            return {
                orderIndex: orderIndex,
                index: index,
                side: side,
                identifier: inputCriteria.identifier,
                criteriaProof: merkleRoot === "0" ? [] : inputCriteria.proof,
            };
        });
    };
    var criteriaResolvers = __spreadArray(__spreadArray([], __read(mapCriteriaItemsToResolver(offerCriteriaItems, offerCriterias)), false), __read(mapCriteriaItemsToResolver(considerationCriteriaItems, considerationCriterias)), false);
    return criteriaResolvers;
};
exports.generateCriteriaResolvers = generateCriteriaResolvers;
var getItemToCriteriaMap = function (items, criterias) {
    var criteriasCopy = __spreadArray([], __read(criterias), false);
    return items.reduce(function (map, item) {
        if ((0, item_1.isCriteriaItem)(item.itemType)) {
            map.set(item, criteriasCopy.shift());
        }
        return map;
    }, new Map());
};
exports.getItemToCriteriaMap = getItemToCriteriaMap;
//# sourceMappingURL=criteria.js.map