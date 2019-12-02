def is_integer(s):
   negative = True if s[:1] == '-' else False
   if s == '':
       return False
   if negative:
       if len(s) == 1:
           return False
       s = s[1:]
       for c in s:
           if not (c>='0' and c<='9'):
               return False
       return True
   else:
       for c in s:
           if not(c>='0' and c<='9'):
               return False
       return True


def loadFile(filepath):
    res = []
    f = open(filepath, 'r')
    for line in f:
        l = line.split(',')
        for _ in l:
            res.append(_.strip())
    return res

def parseInts(ls):
    res = []
    for e in ls:
        if is_integer(e):
            res.append(int(e))
    return res


'''
1 - Addition
2 - Multiplies
99 - Halt
'''
opcodes = [1,2,99]



ilf = parseInts(loadFile('input.txt'))
print(ilf)



def parseInput(inp, startindx):
    for c, e in enumerate(inp, startindx):
        if c % 4 == 0:
            indx = c
            oc = inp[indx]
            if oc in opcodes:
                if oc == 1:
                    fi = inp[indx+1]
                    si = inp[indx+2]
                    ti = inp[indx+3]
                    noun = inp[fi]
                    verb = inp[si]
                    inp[ti] = (noun + verb)
                if oc == 2:
                    fi = inp[indx+1]
                    si = inp[indx+2]
                    ti = inp[indx+3]
                    noun = inp[fi]
                    verb = inp[si]
                    inp[ti] = noun * verb
                if oc == 99:
                    break
    print(inp[0], inp)

def getInp(inp):
    return inp[:]

def rIntCodeInput(inpl):
    for i, e in enumerate(inpl):
        inp = getInp(inpl)
        if e == 1:
            r = inp[inp[i+1]] + inp[inp[i+2]]
            inp[inp[i+3]] = inp[inp[i+1]] + inp[inp[i+2]]
        elif e == 2:
            r = inp[inp[i+1]] + inp[inp[i+2]]
            inp[inp[i+3]] = inp[inp[i+1]] * inp[inp[i+2]]
        elif e == 99:
            return inp[0]
    return inp[0]

def parsePartB(inpl, startindx):
    inp = inpl[:]
    for noun in range(1, 100):
        for verb in range(1, 100):
            inp[1] = noun
            inp[2] = verb
            try:
                if rIntCodeInput(inp) == 19690720:

                    print(noun, verb)
                    return (100*noun) + verb

            except Exception as e:
                continue

print(parsePartB(ilf, 0))
#parseInput(ilf, 0)
