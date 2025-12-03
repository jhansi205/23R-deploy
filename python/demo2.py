#Product Price Calculator
op=float(input("Enter the original price: "))
dp=float(input("Enter the discount %: "))
discount_amount=(dp/100)*(op)
final_price=op-discount_amount
print(f'Final price after {dp}% discount :{final_price}')