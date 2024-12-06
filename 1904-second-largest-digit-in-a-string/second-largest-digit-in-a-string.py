class Solution(object):
    def secondHighest(self, s):
        st=set()
        for i in s:
            if i.isdigit():
             st.add(int(i))
        res=sorted(st,reverse=True)
        if len(res)>1:
            return res[1]
        else:
            return -1