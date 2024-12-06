class Solution(object):
    def findDuplicate(self, nums):
        d={}
        for i in nums:
            if i in d:
                d[i]+=1
            else:
                d[i]=1
        for i,j in d.items():
            if j>1:
                return i
        