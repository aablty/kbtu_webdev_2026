def sum2(nums):
  res = 0
  for i in range(min([len(nums),2])):
    res+=nums[i]
  return res
