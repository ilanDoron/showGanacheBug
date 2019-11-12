# showGanacheBug
small test that shows a possible bug in ganache core

## steps
### install
npm ci

### compile
run ./compilation.sh

### run without istanbul
./tst.sh

### run same tests with istanbul - see failing test
./tst.sh -k istanbul
