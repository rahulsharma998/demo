class Solution(object):
    def truncateSentence(self, s, k):
        words = s.split()
        truncated = ' '.join(words[:k])
        return truncated
        