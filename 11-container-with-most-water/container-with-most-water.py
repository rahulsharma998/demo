class Solution(object):
    def maxArea(self, height):
        maxarea=0
        n=len(height)
        i,j=0,n-1
        while i<j:
           area= min(height[i],height[j])*(j-i)
           maxarea=max(maxarea,area)
           if height[i]<height[j]:
            i+=1
           else:
            j-=1
        return maxarea
        