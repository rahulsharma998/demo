class Solution(object):
    def groupAnagrams(self, strs):
        dic={}
        res=[]
        if len(strs)==0:
            return [""]
        if len(strs)==1:
            return [strs]
        else:
            for i in strs:
                sw="".join(sorted(i))
                if sw in dic:
                    dic[sw].append(i)
                else:
                    dic[sw]=[i]
        for r in dic.values():
            res.append(r)
        return res