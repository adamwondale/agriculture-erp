using Xunit;

namespace FarmLandAgronomy.UnitTests;

public class FarmParcelTests
{
    [Fact]
    public void Entity_Should_Instantiate_With_Default_Values()
    {
        var id = Guid.NewGuid();
        Assert.NotEqual(Guid.Empty, id);
    }
}
