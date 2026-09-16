// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'database.dart';

// ignore_for_file: type=lint
class $LocalFarmersTable extends LocalFarmers
    with TableInfo<$LocalFarmersTable, LocalFarmer> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $LocalFarmersTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<String> id = GeneratedColumn<String>(
      'id', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _farmerCodeMeta =
      const VerificationMeta('farmerCode');
  @override
  late final GeneratedColumn<String> farmerCode = GeneratedColumn<String>(
      'farmer_code', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _fullNameMeta =
      const VerificationMeta('fullName');
  @override
  late final GeneratedColumn<String> fullName = GeneratedColumn<String>(
      'full_name', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _nationalIdMeta =
      const VerificationMeta('nationalId');
  @override
  late final GeneratedColumn<String> nationalId = GeneratedColumn<String>(
      'national_id', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _phoneMeta = const VerificationMeta('phone');
  @override
  late final GeneratedColumn<String> phone = GeneratedColumn<String>(
      'phone', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _regionMeta = const VerificationMeta('region');
  @override
  late final GeneratedColumn<String> region = GeneratedColumn<String>(
      'region', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _woredaMeta = const VerificationMeta('woreda');
  @override
  late final GeneratedColumn<String> woreda = GeneratedColumn<String>(
      'woreda', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _isSyncedMeta =
      const VerificationMeta('isSynced');
  @override
  late final GeneratedColumn<bool> isSynced = GeneratedColumn<bool>(
      'is_synced', aliasedName, false,
      type: DriftSqlType.bool,
      requiredDuringInsert: false,
      defaultConstraints:
          GeneratedColumn.constraintIsAlways('CHECK ("is_synced" IN (0, 1))'),
      defaultValue: const Constant(false));
  @override
  List<GeneratedColumn> get $columns =>
      [id, farmerCode, fullName, nationalId, phone, region, woreda, isSynced];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'local_farmers';
  @override
  VerificationContext validateIntegrity(Insertable<LocalFarmer> instance,
      {bool isInserting = false}) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    } else if (isInserting) {
      context.missing(_idMeta);
    }
    if (data.containsKey('farmer_code')) {
      context.handle(
          _farmerCodeMeta,
          farmerCode.isAcceptableOrUnknown(
              data['farmer_code']!, _farmerCodeMeta));
    } else if (isInserting) {
      context.missing(_farmerCodeMeta);
    }
    if (data.containsKey('full_name')) {
      context.handle(_fullNameMeta,
          fullName.isAcceptableOrUnknown(data['full_name']!, _fullNameMeta));
    } else if (isInserting) {
      context.missing(_fullNameMeta);
    }
    if (data.containsKey('national_id')) {
      context.handle(
          _nationalIdMeta,
          nationalId.isAcceptableOrUnknown(
              data['national_id']!, _nationalIdMeta));
    } else if (isInserting) {
      context.missing(_nationalIdMeta);
    }
    if (data.containsKey('phone')) {
      context.handle(
          _phoneMeta, phone.isAcceptableOrUnknown(data['phone']!, _phoneMeta));
    } else if (isInserting) {
      context.missing(_phoneMeta);
    }
    if (data.containsKey('region')) {
      context.handle(_regionMeta,
          region.isAcceptableOrUnknown(data['region']!, _regionMeta));
    } else if (isInserting) {
      context.missing(_regionMeta);
    }
    if (data.containsKey('woreda')) {
      context.handle(_woredaMeta,
          woreda.isAcceptableOrUnknown(data['woreda']!, _woredaMeta));
    } else if (isInserting) {
      context.missing(_woredaMeta);
    }
    if (data.containsKey('is_synced')) {
      context.handle(_isSyncedMeta,
          isSynced.isAcceptableOrUnknown(data['is_synced']!, _isSyncedMeta));
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  LocalFarmer map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return LocalFarmer(
      id: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}id'])!,
      farmerCode: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}farmer_code'])!,
      fullName: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}full_name'])!,
      nationalId: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}national_id'])!,
      phone: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}phone'])!,
      region: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}region'])!,
      woreda: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}woreda'])!,
      isSynced: attachedDatabase.typeMapping
          .read(DriftSqlType.bool, data['${effectivePrefix}is_synced'])!,
    );
  }

  @override
  $LocalFarmersTable createAlias(String alias) {
    return $LocalFarmersTable(attachedDatabase, alias);
  }
}

class LocalFarmer extends DataClass implements Insertable<LocalFarmer> {
  final String id;
  final String farmerCode;
  final String fullName;
  final String nationalId;
  final String phone;
  final String region;
  final String woreda;
  final bool isSynced;
  const LocalFarmer(
      {required this.id,
      required this.farmerCode,
      required this.fullName,
      required this.nationalId,
      required this.phone,
      required this.region,
      required this.woreda,
      required this.isSynced});
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<String>(id);
    map['farmer_code'] = Variable<String>(farmerCode);
    map['full_name'] = Variable<String>(fullName);
    map['national_id'] = Variable<String>(nationalId);
    map['phone'] = Variable<String>(phone);
    map['region'] = Variable<String>(region);
    map['woreda'] = Variable<String>(woreda);
    map['is_synced'] = Variable<bool>(isSynced);
    return map;
  }

  LocalFarmersCompanion toCompanion(bool nullToAbsent) {
    return LocalFarmersCompanion(
      id: Value(id),
      farmerCode: Value(farmerCode),
      fullName: Value(fullName),
      nationalId: Value(nationalId),
      phone: Value(phone),
      region: Value(region),
      woreda: Value(woreda),
      isSynced: Value(isSynced),
    );
  }

  factory LocalFarmer.fromJson(Map<String, dynamic> json,
      {ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return LocalFarmer(
      id: serializer.fromJson<String>(json['id']),
      farmerCode: serializer.fromJson<String>(json['farmerCode']),
      fullName: serializer.fromJson<String>(json['fullName']),
      nationalId: serializer.fromJson<String>(json['nationalId']),
      phone: serializer.fromJson<String>(json['phone']),
      region: serializer.fromJson<String>(json['region']),
      woreda: serializer.fromJson<String>(json['woreda']),
      isSynced: serializer.fromJson<bool>(json['isSynced']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<String>(id),
      'farmerCode': serializer.toJson<String>(farmerCode),
      'fullName': serializer.toJson<String>(fullName),
      'nationalId': serializer.toJson<String>(nationalId),
      'phone': serializer.toJson<String>(phone),
      'region': serializer.toJson<String>(region),
      'woreda': serializer.toJson<String>(woreda),
      'isSynced': serializer.toJson<bool>(isSynced),
    };
  }

  LocalFarmer copyWith(
          {String? id,
          String? farmerCode,
          String? fullName,
          String? nationalId,
          String? phone,
          String? region,
          String? woreda,
          bool? isSynced}) =>
      LocalFarmer(
        id: id ?? this.id,
        farmerCode: farmerCode ?? this.farmerCode,
        fullName: fullName ?? this.fullName,
        nationalId: nationalId ?? this.nationalId,
        phone: phone ?? this.phone,
        region: region ?? this.region,
        woreda: woreda ?? this.woreda,
        isSynced: isSynced ?? this.isSynced,
      );
  LocalFarmer copyWithCompanion(LocalFarmersCompanion data) {
    return LocalFarmer(
      id: data.id.present ? data.id.value : this.id,
      farmerCode:
          data.farmerCode.present ? data.farmerCode.value : this.farmerCode,
      fullName: data.fullName.present ? data.fullName.value : this.fullName,
      nationalId:
          data.nationalId.present ? data.nationalId.value : this.nationalId,
      phone: data.phone.present ? data.phone.value : this.phone,
      region: data.region.present ? data.region.value : this.region,
      woreda: data.woreda.present ? data.woreda.value : this.woreda,
      isSynced: data.isSynced.present ? data.isSynced.value : this.isSynced,
    );
  }

  @override
  String toString() {
    return (StringBuffer('LocalFarmer(')
          ..write('id: $id, ')
          ..write('farmerCode: $farmerCode, ')
          ..write('fullName: $fullName, ')
          ..write('nationalId: $nationalId, ')
          ..write('phone: $phone, ')
          ..write('region: $region, ')
          ..write('woreda: $woreda, ')
          ..write('isSynced: $isSynced')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(
      id, farmerCode, fullName, nationalId, phone, region, woreda, isSynced);
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is LocalFarmer &&
          other.id == this.id &&
          other.farmerCode == this.farmerCode &&
          other.fullName == this.fullName &&
          other.nationalId == this.nationalId &&
          other.phone == this.phone &&
          other.region == this.region &&
          other.woreda == this.woreda &&
          other.isSynced == this.isSynced);
}

class LocalFarmersCompanion extends UpdateCompanion<LocalFarmer> {
  final Value<String> id;
  final Value<String> farmerCode;
  final Value<String> fullName;
  final Value<String> nationalId;
  final Value<String> phone;
  final Value<String> region;
  final Value<String> woreda;
  final Value<bool> isSynced;
  final Value<int> rowid;
  const LocalFarmersCompanion({
    this.id = const Value.absent(),
    this.farmerCode = const Value.absent(),
    this.fullName = const Value.absent(),
    this.nationalId = const Value.absent(),
    this.phone = const Value.absent(),
    this.region = const Value.absent(),
    this.woreda = const Value.absent(),
    this.isSynced = const Value.absent(),
    this.rowid = const Value.absent(),
  });
  LocalFarmersCompanion.insert({
    required String id,
    required String farmerCode,
    required String fullName,
    required String nationalId,
    required String phone,
    required String region,
    required String woreda,
    this.isSynced = const Value.absent(),
    this.rowid = const Value.absent(),
  })  : id = Value(id),
        farmerCode = Value(farmerCode),
        fullName = Value(fullName),
        nationalId = Value(nationalId),
        phone = Value(phone),
        region = Value(region),
        woreda = Value(woreda);
  static Insertable<LocalFarmer> custom({
    Expression<String>? id,
    Expression<String>? farmerCode,
    Expression<String>? fullName,
    Expression<String>? nationalId,
    Expression<String>? phone,
    Expression<String>? region,
    Expression<String>? woreda,
    Expression<bool>? isSynced,
    Expression<int>? rowid,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (farmerCode != null) 'farmer_code': farmerCode,
      if (fullName != null) 'full_name': fullName,
      if (nationalId != null) 'national_id': nationalId,
      if (phone != null) 'phone': phone,
      if (region != null) 'region': region,
      if (woreda != null) 'woreda': woreda,
      if (isSynced != null) 'is_synced': isSynced,
      if (rowid != null) 'rowid': rowid,
    });
  }

  LocalFarmersCompanion copyWith(
      {Value<String>? id,
      Value<String>? farmerCode,
      Value<String>? fullName,
      Value<String>? nationalId,
      Value<String>? phone,
      Value<String>? region,
      Value<String>? woreda,
      Value<bool>? isSynced,
      Value<int>? rowid}) {
    return LocalFarmersCompanion(
      id: id ?? this.id,
      farmerCode: farmerCode ?? this.farmerCode,
      fullName: fullName ?? this.fullName,
      nationalId: nationalId ?? this.nationalId,
      phone: phone ?? this.phone,
      region: region ?? this.region,
      woreda: woreda ?? this.woreda,
      isSynced: isSynced ?? this.isSynced,
      rowid: rowid ?? this.rowid,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<String>(id.value);
    }
    if (farmerCode.present) {
      map['farmer_code'] = Variable<String>(farmerCode.value);
    }
    if (fullName.present) {
      map['full_name'] = Variable<String>(fullName.value);
    }
    if (nationalId.present) {
      map['national_id'] = Variable<String>(nationalId.value);
    }
    if (phone.present) {
      map['phone'] = Variable<String>(phone.value);
    }
    if (region.present) {
      map['region'] = Variable<String>(region.value);
    }
    if (woreda.present) {
      map['woreda'] = Variable<String>(woreda.value);
    }
    if (isSynced.present) {
      map['is_synced'] = Variable<bool>(isSynced.value);
    }
    if (rowid.present) {
      map['rowid'] = Variable<int>(rowid.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('LocalFarmersCompanion(')
          ..write('id: $id, ')
          ..write('farmerCode: $farmerCode, ')
          ..write('fullName: $fullName, ')
          ..write('nationalId: $nationalId, ')
          ..write('phone: $phone, ')
          ..write('region: $region, ')
          ..write('woreda: $woreda, ')
          ..write('isSynced: $isSynced, ')
          ..write('rowid: $rowid')
          ..write(')'))
        .toString();
  }
}

class $LocalInspectionsTable extends LocalInspections
    with TableInfo<$LocalInspectionsTable, LocalInspection> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $LocalInspectionsTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<String> id = GeneratedColumn<String>(
      'id', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _parcelIdMeta =
      const VerificationMeta('parcelId');
  @override
  late final GeneratedColumn<String> parcelId = GeneratedColumn<String>(
      'parcel_id', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _healthScoreMeta =
      const VerificationMeta('healthScore');
  @override
  late final GeneratedColumn<int> healthScore = GeneratedColumn<int>(
      'health_score', aliasedName, false,
      type: DriftSqlType.int, requiredDuringInsert: true);
  static const VerificationMeta _pestDetectedMeta =
      const VerificationMeta('pestDetected');
  @override
  late final GeneratedColumn<bool> pestDetected = GeneratedColumn<bool>(
      'pest_detected', aliasedName, false,
      type: DriftSqlType.bool,
      requiredDuringInsert: true,
      defaultConstraints: GeneratedColumn.constraintIsAlways(
          'CHECK ("pest_detected" IN (0, 1))'));
  static const VerificationMeta _severityPercentageMeta =
      const VerificationMeta('severityPercentage');
  @override
  late final GeneratedColumn<double> severityPercentage =
      GeneratedColumn<double>('severity_percentage', aliasedName, false,
          type: DriftSqlType.double, requiredDuringInsert: true);
  static const VerificationMeta _inspectionDateMeta =
      const VerificationMeta('inspectionDate');
  @override
  late final GeneratedColumn<DateTime> inspectionDate =
      GeneratedColumn<DateTime>('inspection_date', aliasedName, false,
          type: DriftSqlType.dateTime, requiredDuringInsert: true);
  static const VerificationMeta _isSyncedMeta =
      const VerificationMeta('isSynced');
  @override
  late final GeneratedColumn<bool> isSynced = GeneratedColumn<bool>(
      'is_synced', aliasedName, false,
      type: DriftSqlType.bool,
      requiredDuringInsert: false,
      defaultConstraints:
          GeneratedColumn.constraintIsAlways('CHECK ("is_synced" IN (0, 1))'),
      defaultValue: const Constant(false));
  @override
  List<GeneratedColumn> get $columns => [
        id,
        parcelId,
        healthScore,
        pestDetected,
        severityPercentage,
        inspectionDate,
        isSynced
      ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'local_inspections';
  @override
  VerificationContext validateIntegrity(Insertable<LocalInspection> instance,
      {bool isInserting = false}) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    } else if (isInserting) {
      context.missing(_idMeta);
    }
    if (data.containsKey('parcel_id')) {
      context.handle(_parcelIdMeta,
          parcelId.isAcceptableOrUnknown(data['parcel_id']!, _parcelIdMeta));
    } else if (isInserting) {
      context.missing(_parcelIdMeta);
    }
    if (data.containsKey('health_score')) {
      context.handle(
          _healthScoreMeta,
          healthScore.isAcceptableOrUnknown(
              data['health_score']!, _healthScoreMeta));
    } else if (isInserting) {
      context.missing(_healthScoreMeta);
    }
    if (data.containsKey('pest_detected')) {
      context.handle(
          _pestDetectedMeta,
          pestDetected.isAcceptableOrUnknown(
              data['pest_detected']!, _pestDetectedMeta));
    } else if (isInserting) {
      context.missing(_pestDetectedMeta);
    }
    if (data.containsKey('severity_percentage')) {
      context.handle(
          _severityPercentageMeta,
          severityPercentage.isAcceptableOrUnknown(
              data['severity_percentage']!, _severityPercentageMeta));
    } else if (isInserting) {
      context.missing(_severityPercentageMeta);
    }
    if (data.containsKey('inspection_date')) {
      context.handle(
          _inspectionDateMeta,
          inspectionDate.isAcceptableOrUnknown(
              data['inspection_date']!, _inspectionDateMeta));
    } else if (isInserting) {
      context.missing(_inspectionDateMeta);
    }
    if (data.containsKey('is_synced')) {
      context.handle(_isSyncedMeta,
          isSynced.isAcceptableOrUnknown(data['is_synced']!, _isSyncedMeta));
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  LocalInspection map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return LocalInspection(
      id: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}id'])!,
      parcelId: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}parcel_id'])!,
      healthScore: attachedDatabase.typeMapping
          .read(DriftSqlType.int, data['${effectivePrefix}health_score'])!,
      pestDetected: attachedDatabase.typeMapping
          .read(DriftSqlType.bool, data['${effectivePrefix}pest_detected'])!,
      severityPercentage: attachedDatabase.typeMapping.read(
          DriftSqlType.double, data['${effectivePrefix}severity_percentage'])!,
      inspectionDate: attachedDatabase.typeMapping.read(
          DriftSqlType.dateTime, data['${effectivePrefix}inspection_date'])!,
      isSynced: attachedDatabase.typeMapping
          .read(DriftSqlType.bool, data['${effectivePrefix}is_synced'])!,
    );
  }

  @override
  $LocalInspectionsTable createAlias(String alias) {
    return $LocalInspectionsTable(attachedDatabase, alias);
  }
}

class LocalInspection extends DataClass implements Insertable<LocalInspection> {
  final String id;
  final String parcelId;
  final int healthScore;
  final bool pestDetected;
  final double severityPercentage;
  final DateTime inspectionDate;
  final bool isSynced;
  const LocalInspection(
      {required this.id,
      required this.parcelId,
      required this.healthScore,
      required this.pestDetected,
      required this.severityPercentage,
      required this.inspectionDate,
      required this.isSynced});
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<String>(id);
    map['parcel_id'] = Variable<String>(parcelId);
    map['health_score'] = Variable<int>(healthScore);
    map['pest_detected'] = Variable<bool>(pestDetected);
    map['severity_percentage'] = Variable<double>(severityPercentage);
    map['inspection_date'] = Variable<DateTime>(inspectionDate);
    map['is_synced'] = Variable<bool>(isSynced);
    return map;
  }

  LocalInspectionsCompanion toCompanion(bool nullToAbsent) {
    return LocalInspectionsCompanion(
      id: Value(id),
      parcelId: Value(parcelId),
      healthScore: Value(healthScore),
      pestDetected: Value(pestDetected),
      severityPercentage: Value(severityPercentage),
      inspectionDate: Value(inspectionDate),
      isSynced: Value(isSynced),
    );
  }

  factory LocalInspection.fromJson(Map<String, dynamic> json,
      {ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return LocalInspection(
      id: serializer.fromJson<String>(json['id']),
      parcelId: serializer.fromJson<String>(json['parcelId']),
      healthScore: serializer.fromJson<int>(json['healthScore']),
      pestDetected: serializer.fromJson<bool>(json['pestDetected']),
      severityPercentage:
          serializer.fromJson<double>(json['severityPercentage']),
      inspectionDate: serializer.fromJson<DateTime>(json['inspectionDate']),
      isSynced: serializer.fromJson<bool>(json['isSynced']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<String>(id),
      'parcelId': serializer.toJson<String>(parcelId),
      'healthScore': serializer.toJson<int>(healthScore),
      'pestDetected': serializer.toJson<bool>(pestDetected),
      'severityPercentage': serializer.toJson<double>(severityPercentage),
      'inspectionDate': serializer.toJson<DateTime>(inspectionDate),
      'isSynced': serializer.toJson<bool>(isSynced),
    };
  }

  LocalInspection copyWith(
          {String? id,
          String? parcelId,
          int? healthScore,
          bool? pestDetected,
          double? severityPercentage,
          DateTime? inspectionDate,
          bool? isSynced}) =>
      LocalInspection(
        id: id ?? this.id,
        parcelId: parcelId ?? this.parcelId,
        healthScore: healthScore ?? this.healthScore,
        pestDetected: pestDetected ?? this.pestDetected,
        severityPercentage: severityPercentage ?? this.severityPercentage,
        inspectionDate: inspectionDate ?? this.inspectionDate,
        isSynced: isSynced ?? this.isSynced,
      );
  LocalInspection copyWithCompanion(LocalInspectionsCompanion data) {
    return LocalInspection(
      id: data.id.present ? data.id.value : this.id,
      parcelId: data.parcelId.present ? data.parcelId.value : this.parcelId,
      healthScore:
          data.healthScore.present ? data.healthScore.value : this.healthScore,
      pestDetected: data.pestDetected.present
          ? data.pestDetected.value
          : this.pestDetected,
      severityPercentage: data.severityPercentage.present
          ? data.severityPercentage.value
          : this.severityPercentage,
      inspectionDate: data.inspectionDate.present
          ? data.inspectionDate.value
          : this.inspectionDate,
      isSynced: data.isSynced.present ? data.isSynced.value : this.isSynced,
    );
  }

  @override
  String toString() {
    return (StringBuffer('LocalInspection(')
          ..write('id: $id, ')
          ..write('parcelId: $parcelId, ')
          ..write('healthScore: $healthScore, ')
          ..write('pestDetected: $pestDetected, ')
          ..write('severityPercentage: $severityPercentage, ')
          ..write('inspectionDate: $inspectionDate, ')
          ..write('isSynced: $isSynced')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(id, parcelId, healthScore, pestDetected,
      severityPercentage, inspectionDate, isSynced);
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is LocalInspection &&
          other.id == this.id &&
          other.parcelId == this.parcelId &&
          other.healthScore == this.healthScore &&
          other.pestDetected == this.pestDetected &&
          other.severityPercentage == this.severityPercentage &&
          other.inspectionDate == this.inspectionDate &&
          other.isSynced == this.isSynced);
}

class LocalInspectionsCompanion extends UpdateCompanion<LocalInspection> {
  final Value<String> id;
  final Value<String> parcelId;
  final Value<int> healthScore;
  final Value<bool> pestDetected;
  final Value<double> severityPercentage;
  final Value<DateTime> inspectionDate;
  final Value<bool> isSynced;
  final Value<int> rowid;
  const LocalInspectionsCompanion({
    this.id = const Value.absent(),
    this.parcelId = const Value.absent(),
    this.healthScore = const Value.absent(),
    this.pestDetected = const Value.absent(),
    this.severityPercentage = const Value.absent(),
    this.inspectionDate = const Value.absent(),
    this.isSynced = const Value.absent(),
    this.rowid = const Value.absent(),
  });
  LocalInspectionsCompanion.insert({
    required String id,
    required String parcelId,
    required int healthScore,
    required bool pestDetected,
    required double severityPercentage,
    required DateTime inspectionDate,
    this.isSynced = const Value.absent(),
    this.rowid = const Value.absent(),
  })  : id = Value(id),
        parcelId = Value(parcelId),
        healthScore = Value(healthScore),
        pestDetected = Value(pestDetected),
        severityPercentage = Value(severityPercentage),
        inspectionDate = Value(inspectionDate);
  static Insertable<LocalInspection> custom({
    Expression<String>? id,
    Expression<String>? parcelId,
    Expression<int>? healthScore,
    Expression<bool>? pestDetected,
    Expression<double>? severityPercentage,
    Expression<DateTime>? inspectionDate,
    Expression<bool>? isSynced,
    Expression<int>? rowid,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (parcelId != null) 'parcel_id': parcelId,
      if (healthScore != null) 'health_score': healthScore,
      if (pestDetected != null) 'pest_detected': pestDetected,
      if (severityPercentage != null) 'severity_percentage': severityPercentage,
      if (inspectionDate != null) 'inspection_date': inspectionDate,
      if (isSynced != null) 'is_synced': isSynced,
      if (rowid != null) 'rowid': rowid,
    });
  }

  LocalInspectionsCompanion copyWith(
      {Value<String>? id,
      Value<String>? parcelId,
      Value<int>? healthScore,
      Value<bool>? pestDetected,
      Value<double>? severityPercentage,
      Value<DateTime>? inspectionDate,
      Value<bool>? isSynced,
      Value<int>? rowid}) {
    return LocalInspectionsCompanion(
      id: id ?? this.id,
      parcelId: parcelId ?? this.parcelId,
      healthScore: healthScore ?? this.healthScore,
      pestDetected: pestDetected ?? this.pestDetected,
      severityPercentage: severityPercentage ?? this.severityPercentage,
      inspectionDate: inspectionDate ?? this.inspectionDate,
      isSynced: isSynced ?? this.isSynced,
      rowid: rowid ?? this.rowid,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<String>(id.value);
    }
    if (parcelId.present) {
      map['parcel_id'] = Variable<String>(parcelId.value);
    }
    if (healthScore.present) {
      map['health_score'] = Variable<int>(healthScore.value);
    }
    if (pestDetected.present) {
      map['pest_detected'] = Variable<bool>(pestDetected.value);
    }
    if (severityPercentage.present) {
      map['severity_percentage'] = Variable<double>(severityPercentage.value);
    }
    if (inspectionDate.present) {
      map['inspection_date'] = Variable<DateTime>(inspectionDate.value);
    }
    if (isSynced.present) {
      map['is_synced'] = Variable<bool>(isSynced.value);
    }
    if (rowid.present) {
      map['rowid'] = Variable<int>(rowid.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('LocalInspectionsCompanion(')
          ..write('id: $id, ')
          ..write('parcelId: $parcelId, ')
          ..write('healthScore: $healthScore, ')
          ..write('pestDetected: $pestDetected, ')
          ..write('severityPercentage: $severityPercentage, ')
          ..write('inspectionDate: $inspectionDate, ')
          ..write('isSynced: $isSynced, ')
          ..write('rowid: $rowid')
          ..write(')'))
        .toString();
  }
}

class $LocalParcelsTable extends LocalParcels
    with TableInfo<$LocalParcelsTable, LocalParcel> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $LocalParcelsTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<String> id = GeneratedColumn<String>(
      'id', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _parcelCodeMeta =
      const VerificationMeta('parcelCode');
  @override
  late final GeneratedColumn<String> parcelCode = GeneratedColumn<String>(
      'parcel_code', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _farmerIdMeta =
      const VerificationMeta('farmerId');
  @override
  late final GeneratedColumn<String> farmerId = GeneratedColumn<String>(
      'farmer_id', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _gpsPolygonJsonMeta =
      const VerificationMeta('gpsPolygonJson');
  @override
  late final GeneratedColumn<String> gpsPolygonJson = GeneratedColumn<String>(
      'gps_polygon_json', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _areaHectaresMeta =
      const VerificationMeta('areaHectares');
  @override
  late final GeneratedColumn<double> areaHectares = GeneratedColumn<double>(
      'area_hectares', aliasedName, false,
      type: DriftSqlType.double, requiredDuringInsert: true);
  static const VerificationMeta _isSyncedMeta =
      const VerificationMeta('isSynced');
  @override
  late final GeneratedColumn<bool> isSynced = GeneratedColumn<bool>(
      'is_synced', aliasedName, false,
      type: DriftSqlType.bool,
      requiredDuringInsert: false,
      defaultConstraints:
          GeneratedColumn.constraintIsAlways('CHECK ("is_synced" IN (0, 1))'),
      defaultValue: const Constant(false));
  @override
  List<GeneratedColumn> get $columns =>
      [id, parcelCode, farmerId, gpsPolygonJson, areaHectares, isSynced];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'local_parcels';
  @override
  VerificationContext validateIntegrity(Insertable<LocalParcel> instance,
      {bool isInserting = false}) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    } else if (isInserting) {
      context.missing(_idMeta);
    }
    if (data.containsKey('parcel_code')) {
      context.handle(
          _parcelCodeMeta,
          parcelCode.isAcceptableOrUnknown(
              data['parcel_code']!, _parcelCodeMeta));
    } else if (isInserting) {
      context.missing(_parcelCodeMeta);
    }
    if (data.containsKey('farmer_id')) {
      context.handle(_farmerIdMeta,
          farmerId.isAcceptableOrUnknown(data['farmer_id']!, _farmerIdMeta));
    } else if (isInserting) {
      context.missing(_farmerIdMeta);
    }
    if (data.containsKey('gps_polygon_json')) {
      context.handle(
          _gpsPolygonJsonMeta,
          gpsPolygonJson.isAcceptableOrUnknown(
              data['gps_polygon_json']!, _gpsPolygonJsonMeta));
    } else if (isInserting) {
      context.missing(_gpsPolygonJsonMeta);
    }
    if (data.containsKey('area_hectares')) {
      context.handle(
          _areaHectaresMeta,
          areaHectares.isAcceptableOrUnknown(
              data['area_hectares']!, _areaHectaresMeta));
    } else if (isInserting) {
      context.missing(_areaHectaresMeta);
    }
    if (data.containsKey('is_synced')) {
      context.handle(_isSyncedMeta,
          isSynced.isAcceptableOrUnknown(data['is_synced']!, _isSyncedMeta));
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  LocalParcel map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return LocalParcel(
      id: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}id'])!,
      parcelCode: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}parcel_code'])!,
      farmerId: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}farmer_id'])!,
      gpsPolygonJson: attachedDatabase.typeMapping.read(
          DriftSqlType.string, data['${effectivePrefix}gps_polygon_json'])!,
      areaHectares: attachedDatabase.typeMapping
          .read(DriftSqlType.double, data['${effectivePrefix}area_hectares'])!,
      isSynced: attachedDatabase.typeMapping
          .read(DriftSqlType.bool, data['${effectivePrefix}is_synced'])!,
    );
  }

  @override
  $LocalParcelsTable createAlias(String alias) {
    return $LocalParcelsTable(attachedDatabase, alias);
  }
}

class LocalParcel extends DataClass implements Insertable<LocalParcel> {
  final String id;
  final String parcelCode;
  final String farmerId;
  final String gpsPolygonJson;
  final double areaHectares;
  final bool isSynced;
  const LocalParcel(
      {required this.id,
      required this.parcelCode,
      required this.farmerId,
      required this.gpsPolygonJson,
      required this.areaHectares,
      required this.isSynced});
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<String>(id);
    map['parcel_code'] = Variable<String>(parcelCode);
    map['farmer_id'] = Variable<String>(farmerId);
    map['gps_polygon_json'] = Variable<String>(gpsPolygonJson);
    map['area_hectares'] = Variable<double>(areaHectares);
    map['is_synced'] = Variable<bool>(isSynced);
    return map;
  }

  LocalParcelsCompanion toCompanion(bool nullToAbsent) {
    return LocalParcelsCompanion(
      id: Value(id),
      parcelCode: Value(parcelCode),
      farmerId: Value(farmerId),
      gpsPolygonJson: Value(gpsPolygonJson),
      areaHectares: Value(areaHectares),
      isSynced: Value(isSynced),
    );
  }

  factory LocalParcel.fromJson(Map<String, dynamic> json,
      {ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return LocalParcel(
      id: serializer.fromJson<String>(json['id']),
      parcelCode: serializer.fromJson<String>(json['parcelCode']),
      farmerId: serializer.fromJson<String>(json['farmerId']),
      gpsPolygonJson: serializer.fromJson<String>(json['gpsPolygonJson']),
      areaHectares: serializer.fromJson<double>(json['areaHectares']),
      isSynced: serializer.fromJson<bool>(json['isSynced']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<String>(id),
      'parcelCode': serializer.toJson<String>(parcelCode),
      'farmerId': serializer.toJson<String>(farmerId),
      'gpsPolygonJson': serializer.toJson<String>(gpsPolygonJson),
      'areaHectares': serializer.toJson<double>(areaHectares),
      'isSynced': serializer.toJson<bool>(isSynced),
    };
  }

  LocalParcel copyWith(
          {String? id,
          String? parcelCode,
          String? farmerId,
          String? gpsPolygonJson,
          double? areaHectares,
          bool? isSynced}) =>
      LocalParcel(
        id: id ?? this.id,
        parcelCode: parcelCode ?? this.parcelCode,
        farmerId: farmerId ?? this.farmerId,
        gpsPolygonJson: gpsPolygonJson ?? this.gpsPolygonJson,
        areaHectares: areaHectares ?? this.areaHectares,
        isSynced: isSynced ?? this.isSynced,
      );
  LocalParcel copyWithCompanion(LocalParcelsCompanion data) {
    return LocalParcel(
      id: data.id.present ? data.id.value : this.id,
      parcelCode:
          data.parcelCode.present ? data.parcelCode.value : this.parcelCode,
      farmerId: data.farmerId.present ? data.farmerId.value : this.farmerId,
      gpsPolygonJson: data.gpsPolygonJson.present
          ? data.gpsPolygonJson.value
          : this.gpsPolygonJson,
      areaHectares: data.areaHectares.present
          ? data.areaHectares.value
          : this.areaHectares,
      isSynced: data.isSynced.present ? data.isSynced.value : this.isSynced,
    );
  }

  @override
  String toString() {
    return (StringBuffer('LocalParcel(')
          ..write('id: $id, ')
          ..write('parcelCode: $parcelCode, ')
          ..write('farmerId: $farmerId, ')
          ..write('gpsPolygonJson: $gpsPolygonJson, ')
          ..write('areaHectares: $areaHectares, ')
          ..write('isSynced: $isSynced')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(
      id, parcelCode, farmerId, gpsPolygonJson, areaHectares, isSynced);
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is LocalParcel &&
          other.id == this.id &&
          other.parcelCode == this.parcelCode &&
          other.farmerId == this.farmerId &&
          other.gpsPolygonJson == this.gpsPolygonJson &&
          other.areaHectares == this.areaHectares &&
          other.isSynced == this.isSynced);
}

class LocalParcelsCompanion extends UpdateCompanion<LocalParcel> {
  final Value<String> id;
  final Value<String> parcelCode;
  final Value<String> farmerId;
  final Value<String> gpsPolygonJson;
  final Value<double> areaHectares;
  final Value<bool> isSynced;
  final Value<int> rowid;
  const LocalParcelsCompanion({
    this.id = const Value.absent(),
    this.parcelCode = const Value.absent(),
    this.farmerId = const Value.absent(),
    this.gpsPolygonJson = const Value.absent(),
    this.areaHectares = const Value.absent(),
    this.isSynced = const Value.absent(),
    this.rowid = const Value.absent(),
  });
  LocalParcelsCompanion.insert({
    required String id,
    required String parcelCode,
    required String farmerId,
    required String gpsPolygonJson,
    required double areaHectares,
    this.isSynced = const Value.absent(),
    this.rowid = const Value.absent(),
  })  : id = Value(id),
        parcelCode = Value(parcelCode),
        farmerId = Value(farmerId),
        gpsPolygonJson = Value(gpsPolygonJson),
        areaHectares = Value(areaHectares);
  static Insertable<LocalParcel> custom({
    Expression<String>? id,
    Expression<String>? parcelCode,
    Expression<String>? farmerId,
    Expression<String>? gpsPolygonJson,
    Expression<double>? areaHectares,
    Expression<bool>? isSynced,
    Expression<int>? rowid,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (parcelCode != null) 'parcel_code': parcelCode,
      if (farmerId != null) 'farmer_id': farmerId,
      if (gpsPolygonJson != null) 'gps_polygon_json': gpsPolygonJson,
      if (areaHectares != null) 'area_hectares': areaHectares,
      if (isSynced != null) 'is_synced': isSynced,
      if (rowid != null) 'rowid': rowid,
    });
  }

  LocalParcelsCompanion copyWith(
      {Value<String>? id,
      Value<String>? parcelCode,
      Value<String>? farmerId,
      Value<String>? gpsPolygonJson,
      Value<double>? areaHectares,
      Value<bool>? isSynced,
      Value<int>? rowid}) {
    return LocalParcelsCompanion(
      id: id ?? this.id,
      parcelCode: parcelCode ?? this.parcelCode,
      farmerId: farmerId ?? this.farmerId,
      gpsPolygonJson: gpsPolygonJson ?? this.gpsPolygonJson,
      areaHectares: areaHectares ?? this.areaHectares,
      isSynced: isSynced ?? this.isSynced,
      rowid: rowid ?? this.rowid,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<String>(id.value);
    }
    if (parcelCode.present) {
      map['parcel_code'] = Variable<String>(parcelCode.value);
    }
    if (farmerId.present) {
      map['farmer_id'] = Variable<String>(farmerId.value);
    }
    if (gpsPolygonJson.present) {
      map['gps_polygon_json'] = Variable<String>(gpsPolygonJson.value);
    }
    if (areaHectares.present) {
      map['area_hectares'] = Variable<double>(areaHectares.value);
    }
    if (isSynced.present) {
      map['is_synced'] = Variable<bool>(isSynced.value);
    }
    if (rowid.present) {
      map['rowid'] = Variable<int>(rowid.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('LocalParcelsCompanion(')
          ..write('id: $id, ')
          ..write('parcelCode: $parcelCode, ')
          ..write('farmerId: $farmerId, ')
          ..write('gpsPolygonJson: $gpsPolygonJson, ')
          ..write('areaHectares: $areaHectares, ')
          ..write('isSynced: $isSynced, ')
          ..write('rowid: $rowid')
          ..write(')'))
        .toString();
  }
}

class $SyncQueueEntriesTable extends SyncQueueEntries
    with TableInfo<$SyncQueueEntriesTable, SyncQueueEntry> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $SyncQueueEntriesTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
      'id', aliasedName, false,
      hasAutoIncrement: true,
      type: DriftSqlType.int,
      requiredDuringInsert: false,
      defaultConstraints:
          GeneratedColumn.constraintIsAlways('PRIMARY KEY AUTOINCREMENT'));
  static const VerificationMeta _targetServiceMeta =
      const VerificationMeta('targetService');
  @override
  late final GeneratedColumn<String> targetService = GeneratedColumn<String>(
      'target_service', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _idempotencyKeyMeta =
      const VerificationMeta('idempotencyKey');
  @override
  late final GeneratedColumn<String> idempotencyKey = GeneratedColumn<String>(
      'idempotency_key', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _payloadJsonMeta =
      const VerificationMeta('payloadJson');
  @override
  late final GeneratedColumn<String> payloadJson = GeneratedColumn<String>(
      'payload_json', aliasedName, false,
      type: DriftSqlType.string, requiredDuringInsert: true);
  static const VerificationMeta _createdAtMeta =
      const VerificationMeta('createdAt');
  @override
  late final GeneratedColumn<DateTime> createdAt = GeneratedColumn<DateTime>(
      'created_at', aliasedName, false,
      type: DriftSqlType.dateTime, requiredDuringInsert: true);
  static const VerificationMeta _retryCountMeta =
      const VerificationMeta('retryCount');
  @override
  late final GeneratedColumn<int> retryCount = GeneratedColumn<int>(
      'retry_count', aliasedName, false,
      type: DriftSqlType.int,
      requiredDuringInsert: false,
      defaultValue: const Constant(0));
  @override
  List<GeneratedColumn> get $columns =>
      [id, targetService, idempotencyKey, payloadJson, createdAt, retryCount];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'sync_queue_entries';
  @override
  VerificationContext validateIntegrity(Insertable<SyncQueueEntry> instance,
      {bool isInserting = false}) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('target_service')) {
      context.handle(
          _targetServiceMeta,
          targetService.isAcceptableOrUnknown(
              data['target_service']!, _targetServiceMeta));
    } else if (isInserting) {
      context.missing(_targetServiceMeta);
    }
    if (data.containsKey('idempotency_key')) {
      context.handle(
          _idempotencyKeyMeta,
          idempotencyKey.isAcceptableOrUnknown(
              data['idempotency_key']!, _idempotencyKeyMeta));
    } else if (isInserting) {
      context.missing(_idempotencyKeyMeta);
    }
    if (data.containsKey('payload_json')) {
      context.handle(
          _payloadJsonMeta,
          payloadJson.isAcceptableOrUnknown(
              data['payload_json']!, _payloadJsonMeta));
    } else if (isInserting) {
      context.missing(_payloadJsonMeta);
    }
    if (data.containsKey('created_at')) {
      context.handle(_createdAtMeta,
          createdAt.isAcceptableOrUnknown(data['created_at']!, _createdAtMeta));
    } else if (isInserting) {
      context.missing(_createdAtMeta);
    }
    if (data.containsKey('retry_count')) {
      context.handle(
          _retryCountMeta,
          retryCount.isAcceptableOrUnknown(
              data['retry_count']!, _retryCountMeta));
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  SyncQueueEntry map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return SyncQueueEntry(
      id: attachedDatabase.typeMapping
          .read(DriftSqlType.int, data['${effectivePrefix}id'])!,
      targetService: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}target_service'])!,
      idempotencyKey: attachedDatabase.typeMapping.read(
          DriftSqlType.string, data['${effectivePrefix}idempotency_key'])!,
      payloadJson: attachedDatabase.typeMapping
          .read(DriftSqlType.string, data['${effectivePrefix}payload_json'])!,
      createdAt: attachedDatabase.typeMapping
          .read(DriftSqlType.dateTime, data['${effectivePrefix}created_at'])!,
      retryCount: attachedDatabase.typeMapping
          .read(DriftSqlType.int, data['${effectivePrefix}retry_count'])!,
    );
  }

  @override
  $SyncQueueEntriesTable createAlias(String alias) {
    return $SyncQueueEntriesTable(attachedDatabase, alias);
  }
}

class SyncQueueEntry extends DataClass implements Insertable<SyncQueueEntry> {
  final int id;
  final String targetService;
  final String idempotencyKey;
  final String payloadJson;
  final DateTime createdAt;
  final int retryCount;
  const SyncQueueEntry(
      {required this.id,
      required this.targetService,
      required this.idempotencyKey,
      required this.payloadJson,
      required this.createdAt,
      required this.retryCount});
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['target_service'] = Variable<String>(targetService);
    map['idempotency_key'] = Variable<String>(idempotencyKey);
    map['payload_json'] = Variable<String>(payloadJson);
    map['created_at'] = Variable<DateTime>(createdAt);
    map['retry_count'] = Variable<int>(retryCount);
    return map;
  }

  SyncQueueEntriesCompanion toCompanion(bool nullToAbsent) {
    return SyncQueueEntriesCompanion(
      id: Value(id),
      targetService: Value(targetService),
      idempotencyKey: Value(idempotencyKey),
      payloadJson: Value(payloadJson),
      createdAt: Value(createdAt),
      retryCount: Value(retryCount),
    );
  }

  factory SyncQueueEntry.fromJson(Map<String, dynamic> json,
      {ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return SyncQueueEntry(
      id: serializer.fromJson<int>(json['id']),
      targetService: serializer.fromJson<String>(json['targetService']),
      idempotencyKey: serializer.fromJson<String>(json['idempotencyKey']),
      payloadJson: serializer.fromJson<String>(json['payloadJson']),
      createdAt: serializer.fromJson<DateTime>(json['createdAt']),
      retryCount: serializer.fromJson<int>(json['retryCount']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'targetService': serializer.toJson<String>(targetService),
      'idempotencyKey': serializer.toJson<String>(idempotencyKey),
      'payloadJson': serializer.toJson<String>(payloadJson),
      'createdAt': serializer.toJson<DateTime>(createdAt),
      'retryCount': serializer.toJson<int>(retryCount),
    };
  }

  SyncQueueEntry copyWith(
          {int? id,
          String? targetService,
          String? idempotencyKey,
          String? payloadJson,
          DateTime? createdAt,
          int? retryCount}) =>
      SyncQueueEntry(
        id: id ?? this.id,
        targetService: targetService ?? this.targetService,
        idempotencyKey: idempotencyKey ?? this.idempotencyKey,
        payloadJson: payloadJson ?? this.payloadJson,
        createdAt: createdAt ?? this.createdAt,
        retryCount: retryCount ?? this.retryCount,
      );
  SyncQueueEntry copyWithCompanion(SyncQueueEntriesCompanion data) {
    return SyncQueueEntry(
      id: data.id.present ? data.id.value : this.id,
      targetService: data.targetService.present
          ? data.targetService.value
          : this.targetService,
      idempotencyKey: data.idempotencyKey.present
          ? data.idempotencyKey.value
          : this.idempotencyKey,
      payloadJson:
          data.payloadJson.present ? data.payloadJson.value : this.payloadJson,
      createdAt: data.createdAt.present ? data.createdAt.value : this.createdAt,
      retryCount:
          data.retryCount.present ? data.retryCount.value : this.retryCount,
    );
  }

  @override
  String toString() {
    return (StringBuffer('SyncQueueEntry(')
          ..write('id: $id, ')
          ..write('targetService: $targetService, ')
          ..write('idempotencyKey: $idempotencyKey, ')
          ..write('payloadJson: $payloadJson, ')
          ..write('createdAt: $createdAt, ')
          ..write('retryCount: $retryCount')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(
      id, targetService, idempotencyKey, payloadJson, createdAt, retryCount);
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is SyncQueueEntry &&
          other.id == this.id &&
          other.targetService == this.targetService &&
          other.idempotencyKey == this.idempotencyKey &&
          other.payloadJson == this.payloadJson &&
          other.createdAt == this.createdAt &&
          other.retryCount == this.retryCount);
}

class SyncQueueEntriesCompanion extends UpdateCompanion<SyncQueueEntry> {
  final Value<int> id;
  final Value<String> targetService;
  final Value<String> idempotencyKey;
  final Value<String> payloadJson;
  final Value<DateTime> createdAt;
  final Value<int> retryCount;
  const SyncQueueEntriesCompanion({
    this.id = const Value.absent(),
    this.targetService = const Value.absent(),
    this.idempotencyKey = const Value.absent(),
    this.payloadJson = const Value.absent(),
    this.createdAt = const Value.absent(),
    this.retryCount = const Value.absent(),
  });
  SyncQueueEntriesCompanion.insert({
    this.id = const Value.absent(),
    required String targetService,
    required String idempotencyKey,
    required String payloadJson,
    required DateTime createdAt,
    this.retryCount = const Value.absent(),
  })  : targetService = Value(targetService),
        idempotencyKey = Value(idempotencyKey),
        payloadJson = Value(payloadJson),
        createdAt = Value(createdAt);
  static Insertable<SyncQueueEntry> custom({
    Expression<int>? id,
    Expression<String>? targetService,
    Expression<String>? idempotencyKey,
    Expression<String>? payloadJson,
    Expression<DateTime>? createdAt,
    Expression<int>? retryCount,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (targetService != null) 'target_service': targetService,
      if (idempotencyKey != null) 'idempotency_key': idempotencyKey,
      if (payloadJson != null) 'payload_json': payloadJson,
      if (createdAt != null) 'created_at': createdAt,
      if (retryCount != null) 'retry_count': retryCount,
    });
  }

  SyncQueueEntriesCompanion copyWith(
      {Value<int>? id,
      Value<String>? targetService,
      Value<String>? idempotencyKey,
      Value<String>? payloadJson,
      Value<DateTime>? createdAt,
      Value<int>? retryCount}) {
    return SyncQueueEntriesCompanion(
      id: id ?? this.id,
      targetService: targetService ?? this.targetService,
      idempotencyKey: idempotencyKey ?? this.idempotencyKey,
      payloadJson: payloadJson ?? this.payloadJson,
      createdAt: createdAt ?? this.createdAt,
      retryCount: retryCount ?? this.retryCount,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (targetService.present) {
      map['target_service'] = Variable<String>(targetService.value);
    }
    if (idempotencyKey.present) {
      map['idempotency_key'] = Variable<String>(idempotencyKey.value);
    }
    if (payloadJson.present) {
      map['payload_json'] = Variable<String>(payloadJson.value);
    }
    if (createdAt.present) {
      map['created_at'] = Variable<DateTime>(createdAt.value);
    }
    if (retryCount.present) {
      map['retry_count'] = Variable<int>(retryCount.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('SyncQueueEntriesCompanion(')
          ..write('id: $id, ')
          ..write('targetService: $targetService, ')
          ..write('idempotencyKey: $idempotencyKey, ')
          ..write('payloadJson: $payloadJson, ')
          ..write('createdAt: $createdAt, ')
          ..write('retryCount: $retryCount')
          ..write(')'))
        .toString();
  }
}

abstract class _$AppDatabase extends GeneratedDatabase {
  _$AppDatabase(QueryExecutor e) : super(e);
  $AppDatabaseManager get managers => $AppDatabaseManager(this);
  late final $LocalFarmersTable localFarmers = $LocalFarmersTable(this);
  late final $LocalInspectionsTable localInspections =
      $LocalInspectionsTable(this);
  late final $LocalParcelsTable localParcels = $LocalParcelsTable(this);
  late final $SyncQueueEntriesTable syncQueueEntries =
      $SyncQueueEntriesTable(this);
  @override
  Iterable<TableInfo<Table, Object?>> get allTables =>
      allSchemaEntities.whereType<TableInfo<Table, Object?>>();
  @override
  List<DatabaseSchemaEntity> get allSchemaEntities =>
      [localFarmers, localInspections, localParcels, syncQueueEntries];
}

typedef $$LocalFarmersTableCreateCompanionBuilder = LocalFarmersCompanion
    Function({
  required String id,
  required String farmerCode,
  required String fullName,
  required String nationalId,
  required String phone,
  required String region,
  required String woreda,
  Value<bool> isSynced,
  Value<int> rowid,
});
typedef $$LocalFarmersTableUpdateCompanionBuilder = LocalFarmersCompanion
    Function({
  Value<String> id,
  Value<String> farmerCode,
  Value<String> fullName,
  Value<String> nationalId,
  Value<String> phone,
  Value<String> region,
  Value<String> woreda,
  Value<bool> isSynced,
  Value<int> rowid,
});

class $$LocalFarmersTableFilterComposer
    extends Composer<_$AppDatabase, $LocalFarmersTable> {
  $$LocalFarmersTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<String> get id => $composableBuilder(
      column: $table.id, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get farmerCode => $composableBuilder(
      column: $table.farmerCode, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get fullName => $composableBuilder(
      column: $table.fullName, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get nationalId => $composableBuilder(
      column: $table.nationalId, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get phone => $composableBuilder(
      column: $table.phone, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get region => $composableBuilder(
      column: $table.region, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get woreda => $composableBuilder(
      column: $table.woreda, builder: (column) => ColumnFilters(column));

  ColumnFilters<bool> get isSynced => $composableBuilder(
      column: $table.isSynced, builder: (column) => ColumnFilters(column));
}

class $$LocalFarmersTableOrderingComposer
    extends Composer<_$AppDatabase, $LocalFarmersTable> {
  $$LocalFarmersTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<String> get id => $composableBuilder(
      column: $table.id, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get farmerCode => $composableBuilder(
      column: $table.farmerCode, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get fullName => $composableBuilder(
      column: $table.fullName, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get nationalId => $composableBuilder(
      column: $table.nationalId, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get phone => $composableBuilder(
      column: $table.phone, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get region => $composableBuilder(
      column: $table.region, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get woreda => $composableBuilder(
      column: $table.woreda, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<bool> get isSynced => $composableBuilder(
      column: $table.isSynced, builder: (column) => ColumnOrderings(column));
}

class $$LocalFarmersTableAnnotationComposer
    extends Composer<_$AppDatabase, $LocalFarmersTable> {
  $$LocalFarmersTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<String> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get farmerCode => $composableBuilder(
      column: $table.farmerCode, builder: (column) => column);

  GeneratedColumn<String> get fullName =>
      $composableBuilder(column: $table.fullName, builder: (column) => column);

  GeneratedColumn<String> get nationalId => $composableBuilder(
      column: $table.nationalId, builder: (column) => column);

  GeneratedColumn<String> get phone =>
      $composableBuilder(column: $table.phone, builder: (column) => column);

  GeneratedColumn<String> get region =>
      $composableBuilder(column: $table.region, builder: (column) => column);

  GeneratedColumn<String> get woreda =>
      $composableBuilder(column: $table.woreda, builder: (column) => column);

  GeneratedColumn<bool> get isSynced =>
      $composableBuilder(column: $table.isSynced, builder: (column) => column);
}

class $$LocalFarmersTableTableManager extends RootTableManager<
    _$AppDatabase,
    $LocalFarmersTable,
    LocalFarmer,
    $$LocalFarmersTableFilterComposer,
    $$LocalFarmersTableOrderingComposer,
    $$LocalFarmersTableAnnotationComposer,
    $$LocalFarmersTableCreateCompanionBuilder,
    $$LocalFarmersTableUpdateCompanionBuilder,
    (
      LocalFarmer,
      BaseReferences<_$AppDatabase, $LocalFarmersTable, LocalFarmer>
    ),
    LocalFarmer,
    PrefetchHooks Function()> {
  $$LocalFarmersTableTableManager(_$AppDatabase db, $LocalFarmersTable table)
      : super(TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$LocalFarmersTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$LocalFarmersTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$LocalFarmersTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback: ({
            Value<String> id = const Value.absent(),
            Value<String> farmerCode = const Value.absent(),
            Value<String> fullName = const Value.absent(),
            Value<String> nationalId = const Value.absent(),
            Value<String> phone = const Value.absent(),
            Value<String> region = const Value.absent(),
            Value<String> woreda = const Value.absent(),
            Value<bool> isSynced = const Value.absent(),
            Value<int> rowid = const Value.absent(),
          }) =>
              LocalFarmersCompanion(
            id: id,
            farmerCode: farmerCode,
            fullName: fullName,
            nationalId: nationalId,
            phone: phone,
            region: region,
            woreda: woreda,
            isSynced: isSynced,
            rowid: rowid,
          ),
          createCompanionCallback: ({
            required String id,
            required String farmerCode,
            required String fullName,
            required String nationalId,
            required String phone,
            required String region,
            required String woreda,
            Value<bool> isSynced = const Value.absent(),
            Value<int> rowid = const Value.absent(),
          }) =>
              LocalFarmersCompanion.insert(
            id: id,
            farmerCode: farmerCode,
            fullName: fullName,
            nationalId: nationalId,
            phone: phone,
            region: region,
            woreda: woreda,
            isSynced: isSynced,
            rowid: rowid,
          ),
          withReferenceMapper: (p0) => p0
              .map((e) => (
                    e.readTable<$LocalFarmersTable, LocalFarmer>(table),
                    BaseReferences<_$AppDatabase, $LocalFarmersTable,
                        LocalFarmer>(db, table, e)
                  ))
              .toList(),
          prefetchHooksCallback: null,
        ));
}

typedef $$LocalFarmersTableProcessedTableManager = ProcessedTableManager<
    _$AppDatabase,
    $LocalFarmersTable,
    LocalFarmer,
    $$LocalFarmersTableFilterComposer,
    $$LocalFarmersTableOrderingComposer,
    $$LocalFarmersTableAnnotationComposer,
    $$LocalFarmersTableCreateCompanionBuilder,
    $$LocalFarmersTableUpdateCompanionBuilder,
    (
      LocalFarmer,
      BaseReferences<_$AppDatabase, $LocalFarmersTable, LocalFarmer>
    ),
    LocalFarmer,
    PrefetchHooks Function()>;
typedef $$LocalInspectionsTableCreateCompanionBuilder
    = LocalInspectionsCompanion Function({
  required String id,
  required String parcelId,
  required int healthScore,
  required bool pestDetected,
  required double severityPercentage,
  required DateTime inspectionDate,
  Value<bool> isSynced,
  Value<int> rowid,
});
typedef $$LocalInspectionsTableUpdateCompanionBuilder
    = LocalInspectionsCompanion Function({
  Value<String> id,
  Value<String> parcelId,
  Value<int> healthScore,
  Value<bool> pestDetected,
  Value<double> severityPercentage,
  Value<DateTime> inspectionDate,
  Value<bool> isSynced,
  Value<int> rowid,
});

class $$LocalInspectionsTableFilterComposer
    extends Composer<_$AppDatabase, $LocalInspectionsTable> {
  $$LocalInspectionsTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<String> get id => $composableBuilder(
      column: $table.id, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get parcelId => $composableBuilder(
      column: $table.parcelId, builder: (column) => ColumnFilters(column));

  ColumnFilters<int> get healthScore => $composableBuilder(
      column: $table.healthScore, builder: (column) => ColumnFilters(column));

  ColumnFilters<bool> get pestDetected => $composableBuilder(
      column: $table.pestDetected, builder: (column) => ColumnFilters(column));

  ColumnFilters<double> get severityPercentage => $composableBuilder(
      column: $table.severityPercentage,
      builder: (column) => ColumnFilters(column));

  ColumnFilters<DateTime> get inspectionDate => $composableBuilder(
      column: $table.inspectionDate,
      builder: (column) => ColumnFilters(column));

  ColumnFilters<bool> get isSynced => $composableBuilder(
      column: $table.isSynced, builder: (column) => ColumnFilters(column));
}

class $$LocalInspectionsTableOrderingComposer
    extends Composer<_$AppDatabase, $LocalInspectionsTable> {
  $$LocalInspectionsTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<String> get id => $composableBuilder(
      column: $table.id, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get parcelId => $composableBuilder(
      column: $table.parcelId, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<int> get healthScore => $composableBuilder(
      column: $table.healthScore, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<bool> get pestDetected => $composableBuilder(
      column: $table.pestDetected,
      builder: (column) => ColumnOrderings(column));

  ColumnOrderings<double> get severityPercentage => $composableBuilder(
      column: $table.severityPercentage,
      builder: (column) => ColumnOrderings(column));

  ColumnOrderings<DateTime> get inspectionDate => $composableBuilder(
      column: $table.inspectionDate,
      builder: (column) => ColumnOrderings(column));

  ColumnOrderings<bool> get isSynced => $composableBuilder(
      column: $table.isSynced, builder: (column) => ColumnOrderings(column));
}

class $$LocalInspectionsTableAnnotationComposer
    extends Composer<_$AppDatabase, $LocalInspectionsTable> {
  $$LocalInspectionsTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<String> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get parcelId =>
      $composableBuilder(column: $table.parcelId, builder: (column) => column);

  GeneratedColumn<int> get healthScore => $composableBuilder(
      column: $table.healthScore, builder: (column) => column);

  GeneratedColumn<bool> get pestDetected => $composableBuilder(
      column: $table.pestDetected, builder: (column) => column);

  GeneratedColumn<double> get severityPercentage => $composableBuilder(
      column: $table.severityPercentage, builder: (column) => column);

  GeneratedColumn<DateTime> get inspectionDate => $composableBuilder(
      column: $table.inspectionDate, builder: (column) => column);

  GeneratedColumn<bool> get isSynced =>
      $composableBuilder(column: $table.isSynced, builder: (column) => column);
}

class $$LocalInspectionsTableTableManager extends RootTableManager<
    _$AppDatabase,
    $LocalInspectionsTable,
    LocalInspection,
    $$LocalInspectionsTableFilterComposer,
    $$LocalInspectionsTableOrderingComposer,
    $$LocalInspectionsTableAnnotationComposer,
    $$LocalInspectionsTableCreateCompanionBuilder,
    $$LocalInspectionsTableUpdateCompanionBuilder,
    (
      LocalInspection,
      BaseReferences<_$AppDatabase, $LocalInspectionsTable, LocalInspection>
    ),
    LocalInspection,
    PrefetchHooks Function()> {
  $$LocalInspectionsTableTableManager(
      _$AppDatabase db, $LocalInspectionsTable table)
      : super(TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$LocalInspectionsTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$LocalInspectionsTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$LocalInspectionsTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback: ({
            Value<String> id = const Value.absent(),
            Value<String> parcelId = const Value.absent(),
            Value<int> healthScore = const Value.absent(),
            Value<bool> pestDetected = const Value.absent(),
            Value<double> severityPercentage = const Value.absent(),
            Value<DateTime> inspectionDate = const Value.absent(),
            Value<bool> isSynced = const Value.absent(),
            Value<int> rowid = const Value.absent(),
          }) =>
              LocalInspectionsCompanion(
            id: id,
            parcelId: parcelId,
            healthScore: healthScore,
            pestDetected: pestDetected,
            severityPercentage: severityPercentage,
            inspectionDate: inspectionDate,
            isSynced: isSynced,
            rowid: rowid,
          ),
          createCompanionCallback: ({
            required String id,
            required String parcelId,
            required int healthScore,
            required bool pestDetected,
            required double severityPercentage,
            required DateTime inspectionDate,
            Value<bool> isSynced = const Value.absent(),
            Value<int> rowid = const Value.absent(),
          }) =>
              LocalInspectionsCompanion.insert(
            id: id,
            parcelId: parcelId,
            healthScore: healthScore,
            pestDetected: pestDetected,
            severityPercentage: severityPercentage,
            inspectionDate: inspectionDate,
            isSynced: isSynced,
            rowid: rowid,
          ),
          withReferenceMapper: (p0) => p0
              .map((e) => (
                    e.readTable<$LocalInspectionsTable, LocalInspection>(table),
                    BaseReferences<_$AppDatabase, $LocalInspectionsTable,
                        LocalInspection>(db, table, e)
                  ))
              .toList(),
          prefetchHooksCallback: null,
        ));
}

typedef $$LocalInspectionsTableProcessedTableManager = ProcessedTableManager<
    _$AppDatabase,
    $LocalInspectionsTable,
    LocalInspection,
    $$LocalInspectionsTableFilterComposer,
    $$LocalInspectionsTableOrderingComposer,
    $$LocalInspectionsTableAnnotationComposer,
    $$LocalInspectionsTableCreateCompanionBuilder,
    $$LocalInspectionsTableUpdateCompanionBuilder,
    (
      LocalInspection,
      BaseReferences<_$AppDatabase, $LocalInspectionsTable, LocalInspection>
    ),
    LocalInspection,
    PrefetchHooks Function()>;
typedef $$LocalParcelsTableCreateCompanionBuilder = LocalParcelsCompanion
    Function({
  required String id,
  required String parcelCode,
  required String farmerId,
  required String gpsPolygonJson,
  required double areaHectares,
  Value<bool> isSynced,
  Value<int> rowid,
});
typedef $$LocalParcelsTableUpdateCompanionBuilder = LocalParcelsCompanion
    Function({
  Value<String> id,
  Value<String> parcelCode,
  Value<String> farmerId,
  Value<String> gpsPolygonJson,
  Value<double> areaHectares,
  Value<bool> isSynced,
  Value<int> rowid,
});

class $$LocalParcelsTableFilterComposer
    extends Composer<_$AppDatabase, $LocalParcelsTable> {
  $$LocalParcelsTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<String> get id => $composableBuilder(
      column: $table.id, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get parcelCode => $composableBuilder(
      column: $table.parcelCode, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get farmerId => $composableBuilder(
      column: $table.farmerId, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get gpsPolygonJson => $composableBuilder(
      column: $table.gpsPolygonJson,
      builder: (column) => ColumnFilters(column));

  ColumnFilters<double> get areaHectares => $composableBuilder(
      column: $table.areaHectares, builder: (column) => ColumnFilters(column));

  ColumnFilters<bool> get isSynced => $composableBuilder(
      column: $table.isSynced, builder: (column) => ColumnFilters(column));
}

class $$LocalParcelsTableOrderingComposer
    extends Composer<_$AppDatabase, $LocalParcelsTable> {
  $$LocalParcelsTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<String> get id => $composableBuilder(
      column: $table.id, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get parcelCode => $composableBuilder(
      column: $table.parcelCode, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get farmerId => $composableBuilder(
      column: $table.farmerId, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get gpsPolygonJson => $composableBuilder(
      column: $table.gpsPolygonJson,
      builder: (column) => ColumnOrderings(column));

  ColumnOrderings<double> get areaHectares => $composableBuilder(
      column: $table.areaHectares,
      builder: (column) => ColumnOrderings(column));

  ColumnOrderings<bool> get isSynced => $composableBuilder(
      column: $table.isSynced, builder: (column) => ColumnOrderings(column));
}

class $$LocalParcelsTableAnnotationComposer
    extends Composer<_$AppDatabase, $LocalParcelsTable> {
  $$LocalParcelsTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<String> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get parcelCode => $composableBuilder(
      column: $table.parcelCode, builder: (column) => column);

  GeneratedColumn<String> get farmerId =>
      $composableBuilder(column: $table.farmerId, builder: (column) => column);

  GeneratedColumn<String> get gpsPolygonJson => $composableBuilder(
      column: $table.gpsPolygonJson, builder: (column) => column);

  GeneratedColumn<double> get areaHectares => $composableBuilder(
      column: $table.areaHectares, builder: (column) => column);

  GeneratedColumn<bool> get isSynced =>
      $composableBuilder(column: $table.isSynced, builder: (column) => column);
}

class $$LocalParcelsTableTableManager extends RootTableManager<
    _$AppDatabase,
    $LocalParcelsTable,
    LocalParcel,
    $$LocalParcelsTableFilterComposer,
    $$LocalParcelsTableOrderingComposer,
    $$LocalParcelsTableAnnotationComposer,
    $$LocalParcelsTableCreateCompanionBuilder,
    $$LocalParcelsTableUpdateCompanionBuilder,
    (
      LocalParcel,
      BaseReferences<_$AppDatabase, $LocalParcelsTable, LocalParcel>
    ),
    LocalParcel,
    PrefetchHooks Function()> {
  $$LocalParcelsTableTableManager(_$AppDatabase db, $LocalParcelsTable table)
      : super(TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$LocalParcelsTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$LocalParcelsTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$LocalParcelsTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback: ({
            Value<String> id = const Value.absent(),
            Value<String> parcelCode = const Value.absent(),
            Value<String> farmerId = const Value.absent(),
            Value<String> gpsPolygonJson = const Value.absent(),
            Value<double> areaHectares = const Value.absent(),
            Value<bool> isSynced = const Value.absent(),
            Value<int> rowid = const Value.absent(),
          }) =>
              LocalParcelsCompanion(
            id: id,
            parcelCode: parcelCode,
            farmerId: farmerId,
            gpsPolygonJson: gpsPolygonJson,
            areaHectares: areaHectares,
            isSynced: isSynced,
            rowid: rowid,
          ),
          createCompanionCallback: ({
            required String id,
            required String parcelCode,
            required String farmerId,
            required String gpsPolygonJson,
            required double areaHectares,
            Value<bool> isSynced = const Value.absent(),
            Value<int> rowid = const Value.absent(),
          }) =>
              LocalParcelsCompanion.insert(
            id: id,
            parcelCode: parcelCode,
            farmerId: farmerId,
            gpsPolygonJson: gpsPolygonJson,
            areaHectares: areaHectares,
            isSynced: isSynced,
            rowid: rowid,
          ),
          withReferenceMapper: (p0) => p0
              .map((e) => (
                    e.readTable<$LocalParcelsTable, LocalParcel>(table),
                    BaseReferences<_$AppDatabase, $LocalParcelsTable,
                        LocalParcel>(db, table, e)
                  ))
              .toList(),
          prefetchHooksCallback: null,
        ));
}

typedef $$LocalParcelsTableProcessedTableManager = ProcessedTableManager<
    _$AppDatabase,
    $LocalParcelsTable,
    LocalParcel,
    $$LocalParcelsTableFilterComposer,
    $$LocalParcelsTableOrderingComposer,
    $$LocalParcelsTableAnnotationComposer,
    $$LocalParcelsTableCreateCompanionBuilder,
    $$LocalParcelsTableUpdateCompanionBuilder,
    (
      LocalParcel,
      BaseReferences<_$AppDatabase, $LocalParcelsTable, LocalParcel>
    ),
    LocalParcel,
    PrefetchHooks Function()>;
typedef $$SyncQueueEntriesTableCreateCompanionBuilder
    = SyncQueueEntriesCompanion Function({
  Value<int> id,
  required String targetService,
  required String idempotencyKey,
  required String payloadJson,
  required DateTime createdAt,
  Value<int> retryCount,
});
typedef $$SyncQueueEntriesTableUpdateCompanionBuilder
    = SyncQueueEntriesCompanion Function({
  Value<int> id,
  Value<String> targetService,
  Value<String> idempotencyKey,
  Value<String> payloadJson,
  Value<DateTime> createdAt,
  Value<int> retryCount,
});

class $$SyncQueueEntriesTableFilterComposer
    extends Composer<_$AppDatabase, $SyncQueueEntriesTable> {
  $$SyncQueueEntriesTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
      column: $table.id, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get targetService => $composableBuilder(
      column: $table.targetService, builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get idempotencyKey => $composableBuilder(
      column: $table.idempotencyKey,
      builder: (column) => ColumnFilters(column));

  ColumnFilters<String> get payloadJson => $composableBuilder(
      column: $table.payloadJson, builder: (column) => ColumnFilters(column));

  ColumnFilters<DateTime> get createdAt => $composableBuilder(
      column: $table.createdAt, builder: (column) => ColumnFilters(column));

  ColumnFilters<int> get retryCount => $composableBuilder(
      column: $table.retryCount, builder: (column) => ColumnFilters(column));
}

class $$SyncQueueEntriesTableOrderingComposer
    extends Composer<_$AppDatabase, $SyncQueueEntriesTable> {
  $$SyncQueueEntriesTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
      column: $table.id, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get targetService => $composableBuilder(
      column: $table.targetService,
      builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get idempotencyKey => $composableBuilder(
      column: $table.idempotencyKey,
      builder: (column) => ColumnOrderings(column));

  ColumnOrderings<String> get payloadJson => $composableBuilder(
      column: $table.payloadJson, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<DateTime> get createdAt => $composableBuilder(
      column: $table.createdAt, builder: (column) => ColumnOrderings(column));

  ColumnOrderings<int> get retryCount => $composableBuilder(
      column: $table.retryCount, builder: (column) => ColumnOrderings(column));
}

class $$SyncQueueEntriesTableAnnotationComposer
    extends Composer<_$AppDatabase, $SyncQueueEntriesTable> {
  $$SyncQueueEntriesTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get targetService => $composableBuilder(
      column: $table.targetService, builder: (column) => column);

  GeneratedColumn<String> get idempotencyKey => $composableBuilder(
      column: $table.idempotencyKey, builder: (column) => column);

  GeneratedColumn<String> get payloadJson => $composableBuilder(
      column: $table.payloadJson, builder: (column) => column);

  GeneratedColumn<DateTime> get createdAt =>
      $composableBuilder(column: $table.createdAt, builder: (column) => column);

  GeneratedColumn<int> get retryCount => $composableBuilder(
      column: $table.retryCount, builder: (column) => column);
}

class $$SyncQueueEntriesTableTableManager extends RootTableManager<
    _$AppDatabase,
    $SyncQueueEntriesTable,
    SyncQueueEntry,
    $$SyncQueueEntriesTableFilterComposer,
    $$SyncQueueEntriesTableOrderingComposer,
    $$SyncQueueEntriesTableAnnotationComposer,
    $$SyncQueueEntriesTableCreateCompanionBuilder,
    $$SyncQueueEntriesTableUpdateCompanionBuilder,
    (
      SyncQueueEntry,
      BaseReferences<_$AppDatabase, $SyncQueueEntriesTable, SyncQueueEntry>
    ),
    SyncQueueEntry,
    PrefetchHooks Function()> {
  $$SyncQueueEntriesTableTableManager(
      _$AppDatabase db, $SyncQueueEntriesTable table)
      : super(TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$SyncQueueEntriesTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$SyncQueueEntriesTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$SyncQueueEntriesTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback: ({
            Value<int> id = const Value.absent(),
            Value<String> targetService = const Value.absent(),
            Value<String> idempotencyKey = const Value.absent(),
            Value<String> payloadJson = const Value.absent(),
            Value<DateTime> createdAt = const Value.absent(),
            Value<int> retryCount = const Value.absent(),
          }) =>
              SyncQueueEntriesCompanion(
            id: id,
            targetService: targetService,
            idempotencyKey: idempotencyKey,
            payloadJson: payloadJson,
            createdAt: createdAt,
            retryCount: retryCount,
          ),
          createCompanionCallback: ({
            Value<int> id = const Value.absent(),
            required String targetService,
            required String idempotencyKey,
            required String payloadJson,
            required DateTime createdAt,
            Value<int> retryCount = const Value.absent(),
          }) =>
              SyncQueueEntriesCompanion.insert(
            id: id,
            targetService: targetService,
            idempotencyKey: idempotencyKey,
            payloadJson: payloadJson,
            createdAt: createdAt,
            retryCount: retryCount,
          ),
          withReferenceMapper: (p0) => p0
              .map((e) => (
                    e.readTable<$SyncQueueEntriesTable, SyncQueueEntry>(table),
                    BaseReferences<_$AppDatabase, $SyncQueueEntriesTable,
                        SyncQueueEntry>(db, table, e)
                  ))
              .toList(),
          prefetchHooksCallback: null,
        ));
}

typedef $$SyncQueueEntriesTableProcessedTableManager = ProcessedTableManager<
    _$AppDatabase,
    $SyncQueueEntriesTable,
    SyncQueueEntry,
    $$SyncQueueEntriesTableFilterComposer,
    $$SyncQueueEntriesTableOrderingComposer,
    $$SyncQueueEntriesTableAnnotationComposer,
    $$SyncQueueEntriesTableCreateCompanionBuilder,
    $$SyncQueueEntriesTableUpdateCompanionBuilder,
    (
      SyncQueueEntry,
      BaseReferences<_$AppDatabase, $SyncQueueEntriesTable, SyncQueueEntry>
    ),
    SyncQueueEntry,
    PrefetchHooks Function()>;

class $AppDatabaseManager {
  final _$AppDatabase _db;
  $AppDatabaseManager(this._db);
  $$LocalFarmersTableTableManager get localFarmers =>
      $$LocalFarmersTableTableManager(_db, _db.localFarmers);
  $$LocalInspectionsTableTableManager get localInspections =>
      $$LocalInspectionsTableTableManager(_db, _db.localInspections);
  $$LocalParcelsTableTableManager get localParcels =>
      $$LocalParcelsTableTableManager(_db, _db.localParcels);
  $$SyncQueueEntriesTableTableManager get syncQueueEntries =>
      $$SyncQueueEntriesTableTableManager(_db, _db.syncQueueEntries);
}
