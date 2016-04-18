// Generated by CoffeeScript 1.10.0
var blueprintUtils, newlineRegExp;

newlineRegExp = /\n/g;

blueprintUtils = {};

blueprintUtils.characterIndexToPosition = function(charIndex, text) {
  var pieceOfCode, ref;
  if (charIndex == null) {
    charIndex = 0;
  }
  if (text == null) {
    text = '';
  }
  pieceOfCode = text.substring(0, charIndex);
  return {
    row: ((ref = pieceOfCode.match(newlineRegExp)) != null ? ref.length : void 0) + 1
  };
};

blueprintUtils.sortNumbersAscending = function(a, b) {
  return a - b;
};

blueprintUtils.warningLocationToRanges = function(warningLocation, text) {
  var i, j, lastLocation, len, len1, loc, locKey, position, range, ranges, rowIndex, rowsIndexes;
  if (warningLocation == null) {
    warningLocation = [];
  }
  if (text == null) {
    text = '';
  }
  if (!warningLocation.length) {
    return [];
  }
  rowsIndexes = [];
  position = blueprintUtils.characterIndexToPosition(warningLocation[0].index, text);
  rowsIndexes.push(position.row);
  lastLocation = warningLocation[warningLocation.length - 1];
  if (warningLocation.length > 0) {
    for (locKey = i = 0, len = warningLocation.length; i < len; locKey = ++i) {
      loc = warningLocation[locKey];
      if (!(locKey > 0)) {
        continue;
      }
      position = blueprintUtils.characterIndexToPosition(loc.index, text);
      rowsIndexes.push(position.row);
    }
  }
  rowsIndexes.sort(blueprintUtils.sortNumbersAscending);
  ranges = [];
  range = {
    start: rowsIndexes[0],
    end: rowsIndexes[0]
  };
  for (j = 0, len1 = rowsIndexes.length; j < len1; j++) {
    rowIndex = rowsIndexes[j];
    if (rowIndex === range.end || rowIndex === range.end + 1) {
      range.end = rowIndex;
    } else {
      ranges.push(range);
      range = {
        start: rowIndex,
        end: rowIndex
      };
    }
  }
  ranges.push(range);
  return ranges;
};

blueprintUtils.rangesToLinesText = function(ranges) {
  var i, len, pos, range, rangeIndex, ref;
  pos = '';
  ref = ranges || [];
  for (rangeIndex = i = 0, len = ref.length; i < len; rangeIndex = ++i) {
    range = ref[rangeIndex];
    if (rangeIndex > 0) {
      pos += ', ';
    }
    if (range.start !== range.end) {
      pos += "lines " + range.start + "-" + range.end;
    } else {
      pos += "line " + range.start;
    }
  }
  return pos;
};

module.exports = blueprintUtils;