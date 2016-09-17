/* Generic Algorithms */
var Algorithm = {
  /*
   * Generic quick sort.
   * The caller scope needs to implement swap and compare depending on what type of array it tries to sort
   */
  quick_sort: function* quick_sort(array, start, end, swap, compare) {
    if(end > start) {
      var partitionGeneratorObj = this.partition(array, start, end, swap, compare);
      var wall = undefined;
      var done = false;
      while(!done) {
        var next = partitionGeneratorObj.next();
        // console.log('b finally yield ee', fy);
        if(next.value === undefined) {
          console.log(next.value);
          yield;
        } else {
          // console.log('b finally yield', fy);
          wall = next.value;
          done = true;
        }
      }
      // var wall = yield* .value;
      yield* this.quick_sort(array, start, wall-1, swap, compare);
      yield* this.quick_sort(array, wall+1, end, swap, compare);
    }
  },

  partition: function* partition(array, start, end, swap, compare) {
    var wall = start;
    for(var i = start; i < end; i++) {
      if(compare(array[i], array[end])) {
        console.log(wall, i);
        swap(array, wall, i);
        yield;
        wall++;
      }
    }
    console.log('wall', wall, end);
    swap(array, wall, end);
    yield wall;
  },

  merge_sort: function merge_sort(array) {
    if (array.length() > 1) {
      var m = Math.floor(array.length() / 2);
      var left = array.slice(0, m);
      var right = array.slice(m);
      this.merge_sort(left);
      this.merge_sort(right);
      this.merge(array, left, right);
    }
  },

  merge: function merge(array, leftArray, rightArray) {
    var i = 0;
    var l_i = 0;
    var r_i = 0;
    while(l_i < leftArray && r_i < rightArray.length) {
      if(leftArray[l_i] < rightArray[r_i]) {
        array[i] = leftArray[l_i];
        l_i += i;
      } else {
        array[i] = rightArray[r_i];
        r_i += i;
      }
      i++;
    }
    // copy the remaining
    while(l_i < leftArray.length) {
      array[i] = leftArray[l_i];
      l_i += 1;
      i += 1;
    }
    while(r_i < rightArray.length) {
      array[i] = rightArray[r_i];
      r_i += 1;
      i += 1;
    }
  }
};



