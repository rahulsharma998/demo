class Solution(object):
    def reverseWords(self, s):
        w=s.split()
        st=[]
        for i in range(len(w)-1,-1,-1):
            st.append(w[i])
            if i!=0:
                st.append(" ")
        return ("".join(st))

