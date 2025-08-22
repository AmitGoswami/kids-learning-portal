// data.js

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function generateProblems(type, count) {
  const problems = [];
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const objects = ["🍎","🐻","🎈","🌟","🐶","🍌","🦋","🚗","🍓","🐱"];
  const pickObj = () => objects[Math.floor(Math.random()*objects.length)];

  for (let i = 0; i < count; i++) {
    if (type === "count") {
      const num = Math.floor(Math.random() * 10) + 1;
      const obj = pickObj();
      problems.push({
        question: `How many?<br/>${obj.repeat(num)}`,
        questionTxt: `How many ${obj} to you see?`,
        answer: num.toString(),
        options: shuffle([num, num+1, Math.max(1,num-1)].map(n=>n.toString()))
      });
    }
    else if (type === "add") {
      const a = Math.floor(Math.random()*7)+1;
      const b = Math.floor(Math.random()*7)+1;
      const obj = pickObj();
      problems.push({
        question: `${obj.repeat(a)} + ${obj.repeat(b)} = ?`,
        questionTxt: `Add ${a} and ${b}`,
        answer: (a+b).toString(),
        options: shuffle([a+b, a+b+1, Math.max(1,a+b-1)].map(n=>n.toString()))
      });
    }
    else if (type === "subtract") {
      const a = Math.floor(Math.random()*7)+3;
      const b = Math.floor(Math.random()*(a-1))+1;
      const obj = pickObj();
      problems.push({
        question: `${obj.repeat(a)} - ${obj.repeat(b)} = ?`,
        questionTxt: `Subtract ${b} from ${a}`,
        answer: (a-b).toString(),
        options: shuffle([a-b, a-b+1, Math.max(0,a-b-1)].map(n=>n.toString()))
      });
    }
    else if (type === "missingNum") {
      const n = Math.floor(Math.random()*20)+1;
      problems.push({
        question: `${n}, __, ${n+2}`,
        questionTxt: `What comes in between ${n} and ${n+2}`,
        answer: (n+1).toString(),
        options: shuffle([n+1, n+2, n+3].map(n=>n.toString()))
      });
    }
    else if (type === "evenOdd") {
      const num = Math.floor(Math.random() * 20) + 1;
      problems.push({
        question: `Is <strong>${num}</strong> even or odd?`,
        questionTxt: `Is ${num} even or odd?`,
        answer: num % 2 === 0 ? "Even" : "Odd",
        options: shuffle(["Even","Odd"])
      });
    }
    else if (type === "missingLetter") {
      const idx = Math.floor(Math.random()*23);
      problems.push({
        question: `${letters[idx]}, __, ${letters[idx+2]}`,
        questionTxt: `What comes in between ${letters[idx]} and ${letters[idx+2]}?`,
        answer: letters[idx+1],
        options: shuffle([letters[idx+1], letters[idx], letters[idx+3]])
      });
    }
    else if (type === "beforeAfter") {
      const idx = Math.floor(Math.random()*24)+1;
      problems.push({
        question: `What comes after ${letters[idx]}?`,
        questionTxt: `What comes after ${letters[idx]}?`,
        answer: letters[idx+1],
        options: shuffle([letters[idx+1], letters[idx], letters[idx+2]])
      });
    }
    else if (type === "matchNum") {
      const target = Math.floor(Math.random()*5)+1;
      const obj = pickObj();
      const candidates = [target-1,target+1,target+2,target-2].filter(n=>n>=1&&n<=6&&n!==target);
      const wrongs = shuffle([...new Set(candidates)]).slice(0,2);
      while(wrongs.length<2){
        const extra = Math.floor(Math.random()*6)+1;
        if(extra!==target&&!wrongs.includes(extra)) wrongs.push(extra);
      }
      problems.push({
        question: `Match the number: <strong>${target}</strong>`,
        questionTxt: `Match the number: ${target}`,
        answer: target.toString(),
        options: shuffle([
          { label: obj.repeat(target), value: String(target) },
          { label: obj.repeat(wrongs[0]), value: String(wrongs[0]) },
          { label: obj.repeat(wrongs[1]), value: String(wrongs[1]) }
        ])
      });
    }
      else if(type === "compare") {
        const a = Math.floor(Math.random()*10)+1;
        const b = Math.floor(Math.random()*10)+1;
        problems.push({
          question: `Which is greater? ${a} or ${b}?`,
          questionTxt: `Which is greater? ${a} or ${b}?`,
          answer: a > b ? a : b,
          options: shuffle([a.toString(), b.toString()])
        });
      }

      // 2. Number Bonds
      else if(type === "numberBonds"){
        const total = Math.floor(Math.random()*10)+2;
        const part1 = Math.floor(Math.random()*total);
        const part2 = total - part1;
        problems.push({
          question: `Fill the missing number: ${part1} + __ = ${total}`,
          questionTxt: `Fill the missing number: ${part1} + __ = ${total}`,
          answer: part2,
          options: shuffle([part2.toString(), (part2+1).toString(), Math.max(0,part2-1).toString()])
        });
      }

      // 3. Skip Counting
      else if(type === "skipCount"){
        const start = [0,2,5,10][Math.floor(Math.random()*4)];
        const step = [2,5,10][Math.floor(Math.random()*3)];
        const next = start + step;
        problems.push({
          question: `What comes next? ${start}, ... ? (step ${step})`,
          questionTxt: `What comes next? ${start}, ... ? (step ${step})`,
          answer: next,
          options: shuffle([next.toString(), (next+step).toString(), Math.max(0,next-step).toString()])
        });
      }

      // 4. Place Value (Tens & Ones)
      else if(type === "placeValue"){
        const num = Math.floor(Math.random()*90)+10; // 10-99
        const tens = Math.floor(num/10);
        const ones = num % 10;
        problems.push({
          question: `Number ${num}: How many tens?`,
          questionTxt: `Number ${num}: How many tens?`,
          answer: tens,
          options: shuffle([tens, tens+1, Math.max(0,tens-1)])
        });
      }

      // 5. Coins / Money
      else if(type === "coins"){
        const coins = [1,5,10];
        const c1 = coins[Math.floor(Math.random()*coins.length)];
        const c2 = coins[Math.floor(Math.random()*coins.length)];
        problems.push({
          question: `If you have a ${c1} coin and a ${c2} coin, total money = ?`,
          questionTxt: `If you have a ${c1} coin and a ${c2} coin, total money = ?`,
          answer: c1+c2,
          options: shuffle([(c1+c2).toString(), Math.abs(c1-c2).toString(), (c1*c2).toString()])
        });
      }
      // 6. Compare Sizes / Measurement
      else if(type === "measure"){
        const a = Math.floor(Math.random()*10)+1;
        const b = Math.floor(Math.random()*10)+1;
        problems.push({
          question: `Which is taller? ${a} blocks or ${b} blocks?`,
          answer: a > b ? a : b,
          options: shuffle([a.toString(),b.toString()]),
          questionTxt: `Which is taller? ${a} blocks or ${b} blocks?`
        });
      }
    }
  return problems;
}
