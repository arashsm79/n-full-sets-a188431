/*
  Developed by Arash Sal Moslehian
  @ArashSM79
  program for sequence A188431 in Online Encyclopedia of Integer Sequenes
  http://oeis.org/A188431
*/

/*
  The persian artcile for the algorithms of this sequence is available
  at overleaf:
  
*/

/* 
you can change the limit for the term number that the algorithms 
will compute.

these values set the limit for the sliders
( choosing a term that's too large will freeze up the browser )
*/

let maxSeqAlg1 = 30;
let maxSeqAlg2 = 35;
let maxSeqAlg3 = 200;



// First Algorithm for calculating the sequence
function a188431(n) {

  let nSeq = Array.from(new Array(n), (x, i) => i + 1);
  let nDiv2Seq = Array.from(new Array(Math.ceil(n / 2)), (x, i) => i + 1);
  let count = 0;
  const getAllSubsets =
    theArray => theArray.reduce(
      (subsets, value) => subsets.concat(
        subsets.map(set => [value, ...set])
      ),
      [
        []
      ]
    );
  let gg = getAllSubsets(nDiv2Seq);
  gg.shift();
  for (let i of gg) {

    if (equals(sums(new Set(i)), new Set(nSeq))) {

      count += 1;
    }
  }

  return count;
}





// Second algorithm for calculating the sequence
function a188431_2(n) {

  let nSeq = new Set(Array.from(new Array(n), (x, i) => i + 1));

  function a188431_2_bulk(i, s) {

    let si;
    if (i === 1)
      if (equals(sums_3(s), nSeq))
        return 1;
      else
        return 0;
    else {
      si = new Set(s).add(i);
      return a188431_2_bulk(i - 1, s) + a188431_2_bulk(i - 1, si);
    }

  }
  return a188431_2_bulk(Math.ceil(n / 2), new Set([1]));
}



 // Third algorithm for calculating the sequence
function a188431_3(n) {
  function a188431_3_bulk(n, i) {

    if (i * (i + 1) / 2 < n) {
      return 0;
    } else {
      if (n === 0) {
        return 1;
      } else {
        if (i > Math.ceil(n/2))
        {
          return a188431_3_bulk(n, i - 1);
        }
        else
          return a188431_3_bulk(n, i - 1) + a188431_3_bulk(n - i, i - 1);
      }
    }
  }
  return a188431_3_bulk(n, Math.ceil(n/2));
}



//First Algorithm for calculating the set of subset sums
function sums(s) {
  let i, m;
  m = Math.max(...s);
  if (m < 1)
    return new Set();
  else {
    let returnedSet = new Set();
    s.delete(m);
    for (let i of sums(s)) {
      returnedSet.add(i);
      returnedSet.add(i + m);
    }

    returnedSet.add(m);
    return returnedSet;
  }
}





//Second Algorithm for calculating the set of subset sums
function sums_2(s) {

  let seq = new Set();

  function sum_2_bulk(arr, l, r, sum) {

    if (l > r) {
      seq.add(sum);
      return;
    }

    sum_2_bulk(arr, l + 1, r, sum + arr[l]);

    sum_2_bulk(arr, l + 1, r, sum);

  }
  sum_2_bulk(Array.from(s), 0, s.size - 1, 0);
  seq.delete(0);
  return seq;
}




//Third Algorithm for calculating the set of subset sums

function sums_3(s) {

  let seq = new Set();

  function sum_3_bulk(arr, n) {

    let total = 1 << n;

    for (let i = 0; i < total; i++) {
      let sum = 0;


      for (let j = 0; j < n; j++)
        if (i & (1 << j))
          sum += arr[j];

      seq.add(sum);

    }
  }

  sum_3_bulk(Array.from(s), s.size);
  seq.delete(0);
  return seq;

}


function equals(setA, setB) {
  if (setA.size !== setB.size) return false;
  for (var a of setA)
    if (!setB.has(a)) return false;
  return true;
}


//P5js and DOM settings
let canvasWidth = 800;
let canvasHeight = 400;

let alg1Slider;
let alg2Slider;
let alg3Slider;

let alg1Number = "Algorithm 1\nAns: - Time: - ms";
let alg2Number = "Algorithm 2\nAns: - Time: - ms";
let alg3Number = "Algorithm 3\nAns: - Time: - ms";


function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(255);
  setupDOMElements();
}

function draw() {
  background(255);

  let x = canvasHeight / 2;
  let y = canvasWidth / 3;
  textSize(25);
  text("n = " + alg1Slider.value(), 30, x - 130);
  text("n = " + alg2Slider.value(), y - 40, x - 30);
  text("n = " + alg3Slider.value(), 2 * y - 100, x + 70);

  textSize(20);
  text(alg1Number, 30, x - 100);
  text(alg2Number, y - 40, x);
  text(alg3Number, 2 * y - 100, x + 100);
}

function setupDOMElements() {

  let alg1Text = createElement('h2', "Algorithm 1: ");
  alg1Text.position(10, canvasHeight + 10);
  alg1Text.size(AUTO, 50);

  let alg2Text = createElement('h2', 'Algorithm 2: ');
  alg2Text.position(10, alg1Text.y + alg1Text.height);
  alg2Text.size(AUTO, 50);

  let alg3Text = createElement('h2', 'Algorithm 3: ');
  alg3Text.position(10, alg2Text.y + alg2Text.height);
  alg3Text.size(AUTO, 50);


  alg3Slider = createSlider(0, maxSeqAlg3, 26, 1);
  alg3Slider.position(alg3Text.x + 200, alg3Text.y + 20);

  alg2Slider = createSlider(0, maxSeqAlg2, 26, 1);
  alg2Slider.position(alg2Text.x + 200, alg2Text.y + 20);

  alg1Slider = createSlider(0, maxSeqAlg1, 26, 1);
  alg1Slider.position(alg1Text.x + 200, alg1Text.y + 20);

  let alg1Button = createButton('Compute!');
  alg1Button.position(alg1Slider.x + alg1Slider.width + 70, alg1Slider.y);

  alg1Button.mousePressed(() => {
    compute(1);
  });

  let alg2Button = createButton('Compute!');
  alg2Button.position(alg2Slider.x + alg2Slider.width + 70, alg2Slider.y);

  alg2Button.mousePressed(() => {
    compute(2);
  });

  let alg3Button = createButton('Compute!');
  alg3Button.position(alg3Slider.x + alg3Slider.width + 70, alg3Slider.y);

  alg3Button.mousePressed(() => {
    compute(3);
  });
}

function compute(n) {

  let start = new Date().getTime();
  let end = 0;
  let i = 0;

  if (n === 1) {
    i = alg1Slider.value();
    let x = a188431(i);
    end = new Date().getTime();
    let time = end - start;
    if (time === 0) {
      time = "short";
    }
    alg1Number = "Algorithm 1\nAns: " + x + " Time: " + time + " ms";
  } else if (n === 2) {

    i = alg2Slider.value();
    let x = a188431_2(i);
    end = new Date().getTime();
    let time = end - start;
    alg2Number = "Algorithm 2\nAns: " + x + " Time: " + time + " ms";
  } else if (n === 3) {
    i = alg3Slider.value();
    let x = a188431_3(i);
    end = new Date().getTime();
    let time = end - start;
    alg3Number = "Algorithm 3\nAns: " + x + " Time: " + time + " ms";

  }


}