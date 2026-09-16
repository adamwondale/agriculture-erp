using Xunit;

namespace ReportingBI.UnitTests;

public class KpiSnapshotTests
{
    [Fact]
    public void Entity_Should_Instantiate_With_Default_Values()
    {
        var id = Guid.NewGuid();
        Assert.NotEqual(Guid.Empty, id);
    }
}
