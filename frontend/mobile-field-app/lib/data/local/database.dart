import 'package:drift/drift.dart';
import 'dart:io';
import 'package:drift/native.dart';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart' as p;

part 'database.g.dart';

class LocalFarmers extends Table {
  TextColumn get id => text()();
  TextColumn get farmerCode => text()();
  TextColumn get fullName => text()();
  TextColumn get nationalId => text()();
  TextColumn get phone => text()();
  TextColumn get region => text()();
  TextColumn get woreda => text()();
  BoolColumn get isSynced => boolean().withDefault(const Constant(false))();

  @override
  Set<Column> get primaryKey => {id};
}

class LocalInspections extends Table {
  TextColumn get id => text()();
  TextColumn get parcelId => text()();
  IntColumn get healthScore => integer()();
  BoolColumn get pestDetected => boolean()();
  RealColumn get severityPercentage => real()();
  DateTimeColumn get inspectionDate => dateTime()();
  BoolColumn get isSynced => boolean().withDefault(const Constant(false))();

  @override
  Set<Column> get primaryKey => {id};
}

class LocalParcels extends Table {
  TextColumn get id => text()();
  TextColumn get parcelCode => text()();
  TextColumn get farmerId => text()();
  TextColumn get gpsPolygonJson => text()();
  RealColumn get areaHectares => real()();
  BoolColumn get isSynced => boolean().withDefault(const Constant(false))();

  @override
  Set<Column> get primaryKey => {id};
}

class SyncQueueEntries extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get targetService => text()();
  TextColumn get idempotencyKey => text()();
  TextColumn get payloadJson => text()();
  DateTimeColumn get createdAt => dateTime()();
  IntColumn get retryCount => integer().withDefault(const Constant(0))();
}

@DriftDatabase(tables: [LocalFarmers, LocalInspections, LocalParcels, SyncQueueEntries])
class AppDatabase extends _$AppDatabase {
  AppDatabase() : super(_openConnection());

  @override
  int get schemaVersion => 1;
}

LazyDatabase _openConnection() {
  return LazyDatabase(() async {
    final dbFolder = await getApplicationDocumentsDirectory();
    final file = File(p.join(dbFolder.path, 'agri_offline.sqlite'));
    return NativeDatabase.createInBackground(file);
  });
}
