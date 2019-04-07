let Amidakuji = (function() {

    function calculateLanes(n, w, h) {
        let lanes = [];
        let separation = Math.floor((w-n+1)/n);
        let margin = Math.floor((w-((n-1)*(separation+1)+1))/2);
        for (let i=0; i<n; i++) {
            lanes.push({
                x: margin + i * (separation + 1),
                links: [],
                y: { u: 0, d: h }
            });
        }
        return lanes;
    }
    function clash(y, l, lanes) {
        let clashes = false;
        if ( l>0 ) {
            clashes = lanes[l-1].links.some(link=>link.y>y-20&&link.y<y+20);
        }
        clashes = clashes || lanes[l+1].links.some(link=>link.y>y-20&&link.y<y+20);
        clashes = clashes || lanes[l].links.some(link=>link.y>y-20&&link.y<y+20);
        return clashes;
    }
    class Amidakuji {
        constructor(numLanes, width, height) {
            this.lanes = calculateLanes(numLanes, width, height);
            this.generateLinks(height);
        }
        generateLinksNOP(h) {
            let n = this.lanes.length;
            this.cleanLinks();
            this.lanes.forEach(function(lane, i, lanes) {
                if(i===n-1) return;
                let nLinks = Math.floor(Math.random()*n*0.6 + (n/2));
                for (let x=0;x<nLinks; x++) {
                    lane.links.push({
                        y: Math.floor(5+ Math.random()*(h-5)),
                        x: {l:lane.x, r:lanes[i+1].x}
                    });
                }
            });
        }
        cleanLinks() {
            this.lanes.forEach(function(lane) { lane.links = []; });
        }
        generateLinks(h) {
            this.cleanLinks();
            let nLanes = this.lanes.length;
            let nLinks = nLanes*(nLanes)/2;
            for (let i = 0; i< nLinks; i++) {
                let y = Math.floor(15+ Math.random()*(h-15));
                let lLane = Math.floor(Math.random()*(nLanes-1));

                if (!clash( y, lLane, this.lanes)) {
                    this.lanes[lLane].links.push({
                        y: y,
                        x: { l: this.lanes[lLane].x, r: this.lanes[lLane+1].x }
                    });
                } else {
                    i--;
                }
            }
        }
    }
    return Amidakuji;
})();
