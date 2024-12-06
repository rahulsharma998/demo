class Solution(object):
    def search(self, nums, target):
        l,h=0,len(nums)-1
        while (l<=h):
            mid=(l+h)//2
            if nums[mid]==target:
                return mid
            elif nums[mid]<target:
                l=mid+1
            else:
                h=mid-1
        return -1