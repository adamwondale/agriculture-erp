using FluentValidation;
using WarehouseInventory.Application.Commands;

namespace WarehouseInventory.Application.Validators;

public class CreateWarehouseValidator : AbstractValidator<CreateWarehouseCommand>
{
    public CreateWarehouseValidator()
    {
    }
}
