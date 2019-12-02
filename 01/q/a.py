import math
from tqdm import tqdm


def loadFile(filepath):
    res = []
    with open(filepath) as fp:
        for cnt, line in enumerate(fp):
            if line == None or line == '':
                pass
            res.append(line)
    return res


def calcFuel(m, mod=True):
    m = float(m)
    f = m
    f = m / 3.0
    f = math.floor(f)
    f = f - 2
    ff = 0
    if mod:
        ff = calcFFuel(f, [])
        return f + sum(ff)
    else:
        return f + (ff)

def calcFFuel(f, res=[]):
    r = calcFuel(f, False)
    if r > 0:
        res.append(r)
        return calcFFuel(r, res)
    else:
        return res[:]

def main():
    inp = loadFile('input.txt')
    res = []
    for i in tqdm(inp):
        res.append(calcFuel(i))
    print(sum(res))
main()
