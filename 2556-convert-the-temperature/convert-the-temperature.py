class Solution(object):
    def convertTemperature(self, celsius):
        kelvin=celsius+273.15
        f=(celsius*1.80)+32
        return kelvin,f
        