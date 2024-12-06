class Solution(object):
    def maxProfit(self, prices):
        minp=float('inf')
        maxp=0
        for p in prices:
            if p<minp:
                minp=p
            elif p-minp>maxp:
                maxp=p-minp
        return maxp
